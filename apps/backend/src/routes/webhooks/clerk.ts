import { Hono } from 'hono';
import { Webhook } from 'svix';
import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ClerkWebhookPayload } from '@baby-textiles/schemas';

const clerkWebhook = new Hono();

clerkWebhook.post('/clerk', async (c) => {
  const svixId = c.req.header('svix-id');
  const svixTimestamp = c.req.header('svix-timestamp');
  const svixSignature = c.req.header('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return c.json({ error: 'Missing svix headers' }, 400);
  }

  const payload = await c.req.json();

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: ClerkWebhookPayload;
  try {
    evt = webhook.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookPayload;
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return c.json({ error: 'Invalid signature' }, 400);
  }

  const { data: userData, type } = evt;
  const email = userData.email_addresses[0]?.email_address;
  const name = [userData.first_name, userData.last_name].filter(Boolean).join(' ') || null;
  const phone = userData.phone_numbers?.[0]?.phone_number || null;

  if (type === 'user.created') {
    await db.insert(users).values({
      clerkId: userData.id,
      email,
      name,
      phone,
      role: 'customer',
    });
  } else if (type === 'user.updated') {
    await db
      .update(users)
      .set({ email, name, phone })
      .where(eq(users.clerkId, userData.id));
  }

  return c.json({ success: true }, 200);
});

export default clerkWebhook;
