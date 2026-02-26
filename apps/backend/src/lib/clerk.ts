import * as jose from 'jose';

const encoder = new TextEncoder();

export async function verifyClerkToken(token: string): Promise<string> {
  const publicKeyPEM = process.env.CLERK_JWKS_KEY!.replace(/\\n/g, '\n');
  
  const key = await jose.importSPKI(publicKeyPEM, 'RS256');
  
  const { payload } = await jose.jwtVerify(token, key);
  
  return payload.sub as string;
}
