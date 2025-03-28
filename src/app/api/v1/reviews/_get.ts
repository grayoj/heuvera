import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get reviews for a property listing
 *     description: Fetches all reviews for a given property listing.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: query
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the listing for which to fetch reviews.
 *     responses:
 *       200:
 *         description: A list of reviews for the specified listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       picture:
 *                         type: string
 *                         format: url
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

  const reviews = await prisma.review.findMany({
    where: { listingId },
    include: { user: { select: { name: true, picture: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
