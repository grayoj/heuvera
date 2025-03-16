import { HEUVERA_API_KEY } from '@heuvera/lib/constants';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  auth0_id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  picture: z.string().url().nullable(),
  created_at: z.string().datetime(),
});

type ApiResponse<T> = NextResponse<{
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}>;

const createResponse = <T>(
  status: number,
  data?: T,
  error?: string,
  details?: unknown,
): ApiResponse<T> => {
  return NextResponse.json(
    data ? { success: true, data } : { success: false, error, details },
    { status },
  );
};

export async function POST(
  req: NextRequest,
): Promise<ApiResponse<{ user: unknown }>> {
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    if (authHeader !== `Bearer ${HEUVERA_API_KEY}`) {
      return createResponse(401, undefined, 'Unauthorized');
    }

    const body = await req.json();
    const parsedBody = userSchema.parse(body);
    const { auth0_id, email, name, picture, created_at } = parsedBody;

    const user = await prisma.user.upsert({
      where: { auth0_id },
      update: {},
      create: {
        auth0_id,
        email,
        name,
        picture,
        created_at: new Date(created_at),
      },
    });

    return createResponse(200, { user });
  } catch (error) {
    console.error('Error storing user:', error);

    if (error instanceof z.ZodError) {
      return createResponse(400, undefined, 'Invalid input', error.errors);
    }

    return createResponse(500, undefined, 'Internal Server Error');
  }
}
