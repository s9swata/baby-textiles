import type { Context, Next } from 'hono';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

type Bindings = {
  Variables: {
    clerkUserId: string;
  };
};

export async function adminGuard(c: Context<Bindings>, next: Next) {
  const clerkUserId = c.get('clerkUserId');

  if (!clerkUserId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUserId),
  });

  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Forbidden - Admin access required' }, 403);
  }

  await next();
}
