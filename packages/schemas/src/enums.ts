import { z } from 'zod';

export const UserRole = z.enum(['customer', 'admin']);
export type UserRole = z.infer<typeof UserRole>;

export const OrderStatus = z.enum([
  'pending',
  'confirmed',
  'processed',
  'shipped',
  'delivered',
  'cancelled',
]);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const PaymentMethod = z.enum(['online', 'cod']);
export type PaymentMethod = z.infer<typeof PaymentMethod>;

export const VALID_ORDER_STATUSES = OrderStatus.enum;
export const VALID_PAYMENT_METHODS = PaymentMethod.enum;
