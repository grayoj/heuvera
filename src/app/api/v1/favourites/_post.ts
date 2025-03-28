import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/favorites:
 *   post:
 *     summary: Add a listing to favorites
 *     description: Adds a listing to the authenticated user's favorites.
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listingId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Listing added to favorites
 *       400:
 *         description: Listing is already in favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal Server Error
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = await req.json();

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const existingFavorite = await prisma.favoriteListing.findUnique({
      where: { userId_listingId: { userId: user.id, listingId } },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Listing is already in favorites" },
        { status: 400 },
      );
    }

    const favorite = await prisma.favoriteListing.create({
      data: { userId: user.id, listingId },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error: any) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
