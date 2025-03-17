import { NextResponse } from 'next/server';
import { swaggerSpec } from '@heuvera/lib/swagger';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
