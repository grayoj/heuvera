import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/favorites:
 *   get:
 *     summary: Get user's favorite listings
 *     description: Retrieves all favorite listings for the authenticated user.
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/FavoriteListing"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favoriteListing.findMany({
      where: { userId: user.id },
      include: { listing: true },
    });

    return NextResponse.json(favorites);
  } catch (error: any) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
