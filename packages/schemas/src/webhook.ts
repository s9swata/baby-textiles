import { z } from 'zod';

// ============ Clerk Webhook ============

export const ClerkUserDataSchema = z.object({
  id: z.string(),
  email_addresses: z.array(z.object({ email_address: z.string().email() })),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_numbers: z.array(z.object({ phone_number: z.string() })).optional(),
});
export type ClerkUserData = z.infer<typeof ClerkUserDataSchema>;

export const ClerkWebhookPayloadSchema = z.object({
  data: ClerkUserDataSchema,
  type: z.enum(['user.created', 'user.updated']),
});
export type ClerkWebhookPayload = z.infer<typeof ClerkWebhookPayloadSchema>;

// ============ Razorpay Webhook ============

export const RazorpayPaymentSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  status: z.string(),
});
export type RazorpayPayment = z.infer<typeof RazorpayPaymentSchema>;

export const RazorpayWebhookEventSchema = z.object({
  event: z.string(),
  payload: z.object({
    payment: z.object({
      entity: RazorpayPaymentSchema,
    }),
  }),
});
export type RazorpayWebhookEvent = z.infer<typeof RazorpayWebhookEventSchema>;
