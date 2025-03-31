import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";

/**
 * @swagger
 * /api/admin/v1/users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Fetches a user along with all their related data.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details with linked data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  try {
    const admin = authMiddleware(req);
    if (!admin) return admin;

    const id = req.url.split("/").pop();
    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        host: true,
        listings: true,
        Booking: true,
        reviews: true,
        favorites: { include: { listing: true } },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

