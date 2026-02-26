import { Hono } from 'hono';
import { db } from '../../db';
import { orders, users } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { clerkAuth } from '../../middleware/clerk-auth';
import { adminGuard } from '../../middleware/admin-guard';
import { sendOrderEmail } from '../../lib/email';

const adminOrders = new Hono();

adminOrders.get('/', clerkAuth, adminGuard, async (c) => {
  const allOrders = await db
    .select({
      id: orders.id,
      amount: orders.amount,
      currency: orders.currency,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      createdAt: orders.createdAt,
      user: {
        email: users.email,
        name: users.name,
      },
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt));

  return c.json({
    success: true,
    orders: allOrders.map((order) => ({
      ...order,
      amount: Number(order.amount),
      createdAt: order.createdAt?.toISOString() || '',
    })),
  });
});

adminOrders.get('/:id', clerkAuth, adminGuard, async (c) => {
  const orderId = c.req.param('id');

  const order = await db
    .select({
      id: orders.id,
      amount: orders.amount,
      currency: orders.currency,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      items: orders.items,
      shippingAddress: orders.shippingAddress,
      razorpayPaymentId: orders.razorpayPaymentId,
      razorpayOrderId: orders.razorpayOrderId,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      user: {
        email: users.email,
        name: users.name,
        phone: users.phone,
      },
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .where(eq(orders.id, orderId))
    .then((rows) => rows[0]);

  if (!order) {
    return c.json({ error: 'Order not found' }, 404);
  }

  return c.json({
    success: true,
    order: {
      ...order,
      amount: Number(order.amount),
      createdAt: order.createdAt?.toISOString() || '',
      updatedAt: order.updatedAt?.toISOString() || '',
    },
  });
});

adminOrders.patch('/:id', clerkAuth, adminGuard, async (c) => {
  const orderId = c.req.param('id');

  const body = await c.req.json();

  if (!body.status) {
    return c.json({ error: 'Status is required' }, 400);
  }

  const { status } = body;

  const [updatedOrder] = await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, orderId))
    .returning();

  if (!updatedOrder) {
    return c.json({ error: 'Order not found' }, 404);
  }

  const orderUser = await db.query.users.findFirst({
    where: eq(users.id, updatedOrder.userId),
  });

  if (orderUser?.email) {
    await sendOrderEmail(
      orderUser.email,
      orderUser.name,
      updatedOrder.id,
      status
    );
  }

  return c.json({
    success: true,
    order: {
      ...updatedOrder,
      amount: Number(updatedOrder.amount),
      createdAt: updatedOrder.createdAt?.toISOString() || '',
      updatedAt: updatedOrder.updatedAt?.toISOString() || '',
    },
  });
});

export default adminOrders;
