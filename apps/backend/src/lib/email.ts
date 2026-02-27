import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const STATUS_MESSAGES: Record<string, { subject: string; body: string }> = {
  confirmed: {
    subject: 'Your Baby Textiles Order is Confirmed!',
    body: 'Thank you for your order. We are preparing it for shipment.',
  },
  processed: {
    subject: 'Your Baby Textiles Order is Being Prepared',
    body: 'Your order is being carefully packed by our team.',
  },
  shipped: {
    subject: 'Your Baby Textiles Order is On the Way!',
    body: 'Your order has been shipped and is on its way to you.',
  },
  delivered: {
    subject: 'Your Baby Textiles Order Has Been Delivered',
    body: 'Your order has been delivered. Thank you for shopping with us!',
  },
  cancelled: {
    subject: 'Your Baby Textiles Order Has Been Cancelled',
    body: 'Your order has been cancelled. If you have questions, please contact us.',
  },
};

export async function sendOrderEmail(
  email: string,
  name: string | null,
  orderNumber: string,
  status: string
) {
  const template = STATUS_MESSAGES[status];

  if (!template) {
    console.log('No email template for status:', status);
    return;
  }

  await resend.emails.send({
    from: 'Baby Textiles <noreply@babytextiles.com>',
    to: email,
    subject: template.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Baby Textiles</h1>
        <p>Hi ${name || 'Customer'},</p>
        <p>${template.body}</p>
        <p>Order Number: <strong>${orderNumber}</strong></p>
        <p>Thank you for shopping with us!</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Baby Textiles - Premium Indian Handlooms
        </p>
      </div>
    `,
  });
}
