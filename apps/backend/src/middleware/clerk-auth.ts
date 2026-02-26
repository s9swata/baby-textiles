import type { Context, Next } from 'hono';
import { verifyToken } from '@clerk/backend';

type Bindings = {
  Variables: {
    clerkUserId: string;
  };
};

export async function clerkAuth(c: Context<Bindings>, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    c.set('clerkUserId', claims.sub);
    await next();
  } catch (error) {
    console.error('Clerk token verification failed:', error);
    return c.json({ error: 'Invalid token' }, 401);
  }
}
