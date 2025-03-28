import { cancellationQueue } from "@heuvera/lib/queue";
import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/bookings:
 *   delete:
 *     summary: Cancel a booking
 *     description: Allows an authenticated user to cancel their booking if it hasn't started yet.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the booking to cancel.
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Booking ID is missing or cancellation is not allowed.
 *       401:
 *         description: Unauthorized, user not logged in.
 *       403:
 *         description: Booking not found or does not belong to the user.
 *       500:
 *         description: Internal server error.
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true, user: true },
    });

    if (!booking || booking.userId !== user.id) {
      return NextResponse.json(
        { error: "Booking not found or not yours" },
        { status: 403 },
      );
    }

    if (new Date(booking.startDate) <= new Date()) {
      return NextResponse.json(
        { error: "Cannot cancel past or ongoing bookings" },
        { status: 400 },
      );
    }

    const jobData = {
      bookingId: booking.id,
      userEmail: booking.user.email,
      guestName: booking.user.name ?? "Guest",
      propertyName: booking.listing.title ?? "Unknown Property",
      propertyLocation: booking.listing.address ?? "Not Provided",
      checkInDate: booking.startDate.toISOString(),
      checkOutDate: booking.endDate.toISOString(),
    };

    await cancellationQueue.add("booking-cancellation", jobData);
    await prisma.booking.delete({ where: { id: bookingId } });

    return NextResponse.json(
      { message: "Booking cancelled successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
