import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";

/**
 * @swagger
 * /api/admin/v1/listings:
 *   get:
 *     summary: Get all listings with pagination
 *     description: Admins can retrieve a paginated list of all property listings along with the total count.
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of listings per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of listings with total count
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  try {
    const admin = authMiddleware(req);
    if (!admin) return admin;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const skip = (page - 1) * limit;

    const [listings, totalListings] = await prisma.$transaction([
      prisma.listing.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          price: true,
          listingType: true,
          address: true,
          city: true,
          country: true,
          available: true,
          createdAt: true,
        },
      }),
      prisma.listing.count(),
    ]);

    return NextResponse.json({ totalListings, listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

