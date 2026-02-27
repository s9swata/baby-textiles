import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { fetchBackend, getAuthHeaders } from '@/lib/api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = await getToken();

  const { id } = await params;

  const response = await fetchBackend(`/orders/${id}/confirm`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(`Bearer ${token}`),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}
