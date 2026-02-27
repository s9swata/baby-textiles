import { z } from 'zod';

export const OrderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
  sku: z.string().optional(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const ShippingAddressSchema = z.object({
  fullName: z.string().min(1),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(4),
  country: z.string().default('India'),
  phone: z.string().min(10),
});
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;

export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  razorpayPaymentId: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  amount: z.number(),
  currency: z.string().default('INR'),
  paymentMethod: z.enum(['online', 'cod']),
  status: z.enum([
    'pending',
    'confirmed',
    'processed',
    'shipped',
    'delivered',
    'cancelled',
  ]),
  items: z.array(OrderItemSchema),
  shippingAddress: ShippingAddressSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Order = z.infer<typeof OrderSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  clerkId: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  role: z.enum(['customer', 'admin']),
  createdAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;
