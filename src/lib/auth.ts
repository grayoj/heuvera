import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { prisma } from "./prisma";
import { AccountStatus, User } from "@prisma/client";

/**
 * Handles user status restrictions.
 * @param user - The authenticated user.
 * @returns A NextResponse if the user is restricted, otherwise null.
 */
function handleUserStatus(user: User): NextResponse | null {
  const statusMessages: Record<AccountStatus, { status: number; message: string }> = {
    BANNED: { status: 401, message: "Account is banned" },
    SUSPENDED: { status: 403, message: "Account is suspended" },
    ENABLED: { status: 200, message: "OK" },
  };

  const { status, message } = statusMessages[user.accountStatus];
  return status !== 200 ? NextResponse.json({ error: message }, { status }) : null;
}

/**
 * Fetches or creates a user in the database based on Auth0 session.
 * @param req - The incoming request.
 * @returns A NextResponse containing the user data or an error.
 */
export async function getOrCreateUser(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub: auth0_id, email, name, picture } = session.user;

  const user = await prisma.user.upsert({
    where: { auth0_id },
    update: {},
    create: { auth0_id, email: email ?? "", name: name || null, picture: picture || null },
  });

  const restrictionResponse = handleUserStatus(user);
  if (restrictionResponse) return restrictionResponse;

  return NextResponse.json(user, { status: 200 });
}
