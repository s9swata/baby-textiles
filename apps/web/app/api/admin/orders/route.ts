import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { fetchBackend, getAuthHeaders } from '@/lib/api';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetchBackend('/admin/orders', {
    method: 'GET',
    headers: getAuthHeaders(userId),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}
