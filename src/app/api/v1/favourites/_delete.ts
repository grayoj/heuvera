import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/favorites/{listingId}:
 *   delete:
 *     summary: Remove a listing from favorites
 *     description: Deletes a listing from the authenticated user's favorites.
 *     tags: [Favorites]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the listing to remove from favorites.
 *     responses:
 *       200:
 *         description: Listing removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Removed from favorites"
 *       400:
 *         description: Listing ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const listingId = url.pathname.split("/").pop();

    if (!listingId) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 },
      );
    }

    const favorite = await prisma.favoriteListing.findUnique({
      where: { userId_listingId: { userId: user.id, listingId } },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 },
      );
    }

    await prisma.favoriteListing.delete({
      where: { userId_listingId: { userId: user.id, listingId } },
    });

    return NextResponse.json(
      { message: "Removed from favorites" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
