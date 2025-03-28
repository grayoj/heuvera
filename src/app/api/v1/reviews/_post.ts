import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Add a review for a property listing
 *     description: Users can review a property only if they have booked it.
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listingId
 *               - rating
 *             properties:
 *               listingId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Amazing stay! The host was very accommodating."
 *     responses:
 *       200:
 *         description: Review successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 listingId:
 *                   type: string
 *                 rating:
 *                   type: integer
 *                 comment:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You must book this property before reviewing
 *       409:
 *         description: Review already exists
 */
export async function POST(req: NextRequest) {
  const user = await getOrCreateUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId, rating, comment } = await req.json();
  if (!listingId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const hasBooked = await prisma.booking.findFirst({
    where: { userId: user.id, listingId },
  });

  if (!hasBooked) {
    return NextResponse.json(
      { error: "You must book this property before reviewing" },
      { status: 403 },
    );
  }

  try {
    const review = await prisma.review.create({
      data: { userId: user.id, listingId, rating, comment },
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: "Review already exists" },
      { status: 409 },
    );
  }
}
