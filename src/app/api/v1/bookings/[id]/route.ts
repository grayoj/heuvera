import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Get booking details
 *     description: Retrieves details of a specific booking for an authenticated user.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the booking to retrieve.
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   type: object
 *       400:
 *         description: Booking ID is missing.
 *       401:
 *         description: Unauthorized, user not logged in.
 *       403:
 *         description: User is not authorized to view this booking.
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: Internal server error.
 */
export async function GET(
  req: NextRequest,
  context: unknown,
): Promise<NextResponse> {
  const { params } = context as { params: { id: string } };

  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookingId = params.id;
    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized to view this booking" },
        { status: 403 },
      );
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
