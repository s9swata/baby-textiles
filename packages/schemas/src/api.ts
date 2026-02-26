import { z } from 'zod';
import { OrderItemSchema, ShippingAddressSchema } from './order';
import { OrderStatus, PaymentMethod } from './enums';

// ============ Request Schemas ============

export const CreateOrderRequestSchema = z.object({
  amount: z.number().positive(),
  items: z.array(OrderItemSchema).min(1),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: PaymentMethod,
});
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export const UpdateOrderStatusRequestSchema = z.object({
  status: OrderStatus,
});
export type UpdateOrderStatusRequest = z.infer<typeof UpdateOrderStatusRequestSchema>;

// ============ Response Schemas ============

export const ApiErrorResponseSchema = z.object({
  error: z.string(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export const CreateOrderCodResponseSchema = z.object({
  success: z.literal(true),
  orderId: z.string().uuid(),
  message: z.literal('COD order confirmed'),
});
export type CreateOrderCodResponse = z.infer<typeof CreateOrderCodResponseSchema>;

export const CreateOrderOnlineResponseSchema = z.object({
  razorpayOrderId: z.string(),
  amount: z.number(),
  keyId: z.string(),
});
export type CreateOrderOnlineResponse = z.infer<typeof CreateOrderOnlineResponseSchema>;

export const OrderListItemSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  status: OrderStatus,
  paymentMethod: PaymentMethod,
  createdAt: z.string().datetime(),
  user: z.object({
    email: z.string().email(),
    name: z.string().nullable(),
  }).optional(),
});
export type OrderListItem = z.infer<typeof OrderListItemSchema>;

export const OrderDetailSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  status: OrderStatus,
  paymentMethod: PaymentMethod,
  items: z.array(OrderItemSchema),
  shippingAddress: ShippingAddressSchema,
  razorpayPaymentId: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: z.object({
    email: z.string().email(),
    name: z.string().nullable(),
    phone: z.string().nullable(),
  }).optional(),
});
export type OrderDetail = z.infer<typeof OrderDetailSchema>;

export const OrderListResponseSchema = z.object({
  success: z.literal(true),
  orders: z.array(OrderListItemSchema),
});
export type OrderListResponse = z.infer<typeof OrderListResponseSchema>;

export const OrderDetailResponseSchema = z.object({
  success: z.literal(true),
  order: OrderDetailSchema,
});
export type OrderDetailResponse = z.infer<typeof OrderDetailResponseSchema>;

export const UpdateOrderStatusResponseSchema = z.object({
  success: z.literal(true),
  order: OrderDetailSchema,
});
export type UpdateOrderStatusResponse = z.infer<typeof UpdateOrderStatusResponseSchema>;
