import type { NextRequest, NextResponse } from 'next/server';
import { revalidate } from 'lib/shopify';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
