import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { prisma } from "@heuvera/lib/prisma";
import { sendEmail } from "@heuvera/lib/email";
import { getWelcomeEmail } from "@heuvera/lib/email/render";

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Retrieve or create a user from the session
 *     description: Fetches an existing user or creates a new one if they do not exist in the database.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User retrieved or created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newUser:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     auth0_id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     picture:
 *                       type: string
 *       401:
 *         description: Unauthorized - No session found
 *       500:
 *         description: Internal server error
 */
export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sub: auth0_id, email, name, picture } = session.user;

    let user = await prisma.user.findUnique({ where: { auth0_id } });
    let newUser = false;

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0_id,
          email: email ?? "",
          name: name || null,
          picture: picture || null,
        },
      });
      newUser = true;

      const userName = user.name ?? "there";
      const emailBody = await getWelcomeEmail(
        userName,
        "https://heuvera.com/dashboard",
      );
      await sendEmail(user.email, "Host Approval Confirmation", emailBody);
    }

    return NextResponse.json(
      {
        message: newUser ? "User created successfully" : "User already exists",
        newUser,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling user request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
