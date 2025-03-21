import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { prisma } from './prisma';

const AUTH0_ISSUER = process.env.AUTH0_ISSUER!;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE!;
const AUTH0_JWKS_URI = `${AUTH0_ISSUER}.well-known/jwks.json`;

const client = jwksClient({
  jwksUri: AUTH0_JWKS_URI,
});

async function getKey(header: any, callback: any) {
  const key = await client.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
}

export async function getOrCreateUser(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          audience: AUTH0_AUDIENCE,
          issuer: AUTH0_ISSUER,
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        },
      );
    });

    if (!decoded) return null;

    const { sub: auth0_id, email, name, picture } = decoded;

    let user = await prisma.user.findUnique({ where: { auth0_id } });

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
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
}
