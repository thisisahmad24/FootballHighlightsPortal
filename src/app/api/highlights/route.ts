import { NextResponse } from 'next/server';
import { getMatchHighlights } from '@/lib/api-football';

export async function GET() {
  const highlights = await getMatchHighlights();
  return NextResponse.json(highlights);
}
