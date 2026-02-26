import { Hono } from 'hono';
import { db } from '../db';
import { orders, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { razorpay } from '../lib/razorpay';
import { clerkAuth } from '../middleware/clerk-auth';

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
    const [order] = await db
      .insert(orders)
      .values({
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
      message: 'COD order confirmed',
    });
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `order_${Date.now()}`,
  });

  await db.insert(orders).values({
    userId: user.id,
    razorpayOrderId: razorpayOrder.id,
    amount: Math.round(amount * 100),
    currency: 'INR',
    paymentMethod: 'online',
    status: 'pending',
    items,
    shippingAddress,
  });

  return c.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

export default ordersRoute;
