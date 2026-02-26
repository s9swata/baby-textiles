import { Hono } from 'hono';
import { db } from '../../db';
import { orders } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { verifyRazorpaySignature } from '../../lib/razorpay';

const razorpayWebhook = new Hono();

razorpayWebhook.post('/razorpay', async (c) => {
  const body = await c.req.text();
  const signature = c.req.header('x-razorpay-signature');

  if (!signature) {
    return c.json({ error: 'Missing signature' }, 400);
  }

  const isValid = verifyRazorpaySignature(body, signature);

  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 400);
  }

  const event = JSON.parse(body);

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;

    await db
      .update(orders)
      .set({
        status: 'confirmed',
        razorpayPaymentId: payment.id,
        updatedAt: new Date(),
      })
      .where(eq(orders.razorpayOrderId, payment.order_id));
  }

  return c.json({ success: true }, 200);
});

export default razorpayWebhook;
