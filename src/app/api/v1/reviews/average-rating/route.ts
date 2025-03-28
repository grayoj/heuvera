import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/reviews/average-rating:
 *   get:
 *     summary: Get average rating for a property listing
 *     description: Retrieves the average rating and total review count for a given property listing.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: query
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the listing for which to fetch the average rating.
 *     responses:
 *       200:
 *         description: The average rating and review count for the specified listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   description: The average rating of the listing.
 *                 count:
 *                   type: integer
 *                   description: The total number of reviews for the listing.
 *       400:
 *         description: Listing ID is required.
 */
export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const listingId = searchParams.get("listingId");

  if (!listingId) {
    return NextResponse.json(
      { error: "Listing ID is required" },
      { status: 400 },
    );
  }

  const rating = await prisma.review.aggregate({
    where: { listingId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return NextResponse.json({
    average: rating._avg.rating || 0,
    count: rating._count.rating,
  });
}
