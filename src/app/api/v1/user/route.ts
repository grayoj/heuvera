import { getOrCreateUser } from "@heuvera/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get logged-in user
 *     description: Retrieves details of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                   format: email
 *                 name:
 *                   type: string
 *       401:
 *         description: Unauthorized, user not logged in.
 *       500:
 *         description: Internal server error.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
