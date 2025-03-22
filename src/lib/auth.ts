import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { prisma } from './prisma';

export async function getOrCreateUser(req: NextRequest) {
  const res = NextResponse.next();

  const session = await getSession(req, res);

  if (!session || !session.user) {
    return null;
  }

  const { sub: auth0_id, email, name, picture } = session.user;

  let user = await prisma.user.findUnique({
    where: { auth0_id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0_id,
        email: email ?? '',
        name: name || null,
        picture: picture || null,
      },
    });
  }

  return user;
}
