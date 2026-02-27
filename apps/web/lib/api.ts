const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchBackend(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return response;
}

export function getAuthHeaders(authorization: string): HeadersInit {
  const authValue = authorization.startsWith('Bearer ') 
    ? authorization 
    : `Bearer ${authorization}`;
  return {
    Authorization: authValue,
  };
}
