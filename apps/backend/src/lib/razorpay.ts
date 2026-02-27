import Razorpay from 'razorpay';

const hasRazorpayKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

export const razorpay = hasRazorpayKeys
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  : null;

const encoder = new TextEncoder();

async function hmacSHA256(key: string, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyRazorpaySignature(
  body: string,
  signature: string
): Promise<boolean> {
  const expectedSignature = await hmacSHA256(
    process.env.RAZORPAY_KEY_SECRET!,
    body
  );
  return expectedSignature === signature;
}
