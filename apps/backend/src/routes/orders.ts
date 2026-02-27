import { Hono } from 'hono';
import { db } from '../db';
import { orders, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { razorpay } from '../lib/razorpay';
import { clerkAuth } from '../middleware/clerk-auth';
import { generateOrderNumber } from '../lib/order';

const ordersRoute = new Hono();

ordersRoute.post('/create', clerkAuth, async (c) => {
  const clerkUserId = c.get('clerkUserId') as string;

  const body = await c.req.json();

  if (!body.amount || !body.items || !body.shippingAddress || !body.paymentMethod) {
    return c.json({ error: 'Invalid request body' }, 400);
  }

  const { amount, items, shippingAddress, paymentMethod } = body;

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUserId),
  });

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  if (paymentMethod === 'cod') {
    const orderNumber = generateOrderNumber();
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: user.id,
        amount: Math.round(amount * 100),
        currency: 'INR',
        paymentMethod: 'cod',
        status: 'confirmed',
        items,
        shippingAddress,
      })
      .returning();

    return c.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      message: 'COD order confirmed',
    });
  }

  const isProduction = process.env.NODE_ENV === "production";
  const hasRazorpay = razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET;

  if (!hasRazorpay && !isProduction) {
    const mockOrderId = `mock_order_${Date.now()}`;
    const orderNumber = generateOrderNumber();
    
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: user.id,
        razorpayOrderId: mockOrderId,
        amount: Math.round(amount * 100),
        currency: 'INR',
        paymentMethod: 'online',
        status: 'pending',
        items,
        shippingAddress,
      })
      .returning();

    return c.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId: mockOrderId,
      isMock: true,
      message: 'Order created with mock payment',
    });
  }

  if (!razorpay) {
    return c.json({ error: 'Payment gateway not configured' }, 503);
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `order_${Date.now()}`,
  });

  const orderNumber = generateOrderNumber();

  const [order] = await db.insert(orders).values({
    orderNumber,
    userId: user.id,
    razorpayOrderId: razorpayOrder.id,
    amount: Math.round(amount * 100),
    currency: 'INR',
    paymentMethod: 'online',
    status: 'pending',
    items,
    shippingAddress,
  }).returning();

  return c.json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

ordersRoute.post('/:id/confirm', clerkAuth, async (c) => {
  const orderId = c.req.param('id');
  const clerkUserId = c.get('clerkUserId') as string;

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUserId),
  });

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order) {
    return c.json({ error: 'Order not found' }, 404);
  }

  if (order.userId !== user.id) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  if (order.status !== 'pending') {
    return c.json({ error: 'Order already processed' }, 400);
  }

  const mockPaymentId = `mock_payment_${Date.now()}`;

  await db
    .update(orders)
    .set({
      status: 'confirmed',
      razorpayPaymentId: mockPaymentId,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return c.json({
    success: true,
    message: 'Payment confirmed',
    paymentId: mockPaymentId,
    isMock: true,
  });
});

ordersRoute.post('/:id/cancel', clerkAuth, async (c) => {
  const orderId = c.req.param('id');
  const clerkUserId = c.get('clerkUserId') as string;

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUserId),
  });

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order) {
    return c.json({ error: 'Order not found' }, 404);
  }

  if (order.userId !== user.id) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  if (order.status !== 'pending') {
    return c.json({ error: 'Cannot cancel order that is not pending' }, 400);
  }

  await db
    .update(orders)
    .set({
      status: 'cancelled',
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return c.json({
    success: true,
    message: 'Order cancelled',
  });
});

export default ordersRoute;
