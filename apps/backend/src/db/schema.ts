import { pgTable, text, timestamp, uuid, varchar, integer, pgEnum, jsonb } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['customer', 'admin']);
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed',
  'processed',
  'shipped',
  'delivered',
  'cancelled',
]);
export const paymentMethodEnum = pgEnum('payment_method', ['online', 'cod']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  role: userRoleEnum('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: varchar('order_number', { length: 12 }).notNull().unique(),
  userId: uuid('user_id').notNull().references(() => users.id),
  razorpayPaymentId: text('razorpay_payment_id'),
  razorpayOrderId: text('razorpay_order_id'),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 3 }).default('INR'),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  items: jsonb('items').notNull(),
  shippingAddress: jsonb('shipping_address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
