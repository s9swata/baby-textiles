import { Hono } from 'hono';
import { cors } from 'hono/cors';
import clerkWebhook from './routes/webhooks/clerk';
import razorpayWebhook from './routes/webhooks/razorpay';
import ordersRoute from './routes/orders';
import adminOrders from './routes/admin/orders';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (c) => c.json({ status: 'ok', service: 'baby-textiles-backend' }));

app.route('/webhooks', clerkWebhook);
app.route('/webhooks', razorpayWebhook);
app.route('/orders', ordersRoute);
app.route('/admin/orders', adminOrders);

app.notFound((c) => c.json({ error: 'Not Found' }, 404));
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
