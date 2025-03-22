import { getOrCreateUser } from '@heuvera/lib/auth';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';
import { redis } from '@heuvera/lib/redis';
import { queue } from '@heuvera/lib/queue';

const bookingSchema = z.object({
  listingId: z.string().uuid(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  guests: z.number().int().positive(),
});

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Users can book a listing by providing the listing ID, start date, end date, and the number of guests.
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listingId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the listing to book.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the booking (YYYY-MM-DD).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the booking (YYYY-MM-DD).
 *               guests:
 *                 type: integer
 *                 minimum: 1
 *                 description: Number of guests for the booking.
 *     responses:
 *       201:
 *         description: Booking successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     listingId:
 *                       type: string
 *                       format: uuid
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     guests:
 *                       type: integer
 *                     totalPrice:
 *                       type: number
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized, user not logged in.
 *       403:
 *         description: Forbidden, user cannot book their own listing.
 *       404:
 *         description: Listing not found.
 *       500:
 *         description: Internal server error.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    const listing = await prisma.listing.findUnique({
      where: { id: validatedData.listingId },
      select: { hostId: true, price: true },
    });

    if (!listing)
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    if (listing.hostId === user.id)
      return NextResponse.json(
        { error: 'You cannot book your own listing' },
        { status: 403 },
      );

    const startDate = new Date(validatedData.startDate);
    const endDate = new Date(validatedData.endDate);
    const duration =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    if (duration <= 0)
      return NextResponse.json(
        { error: 'Invalid booking dates' },
        { status: 400 },
      );

    const isAvailable = await redis.get(
      `booking:${validatedData.listingId}:${validatedData.startDate}`,
    );
    if (isAvailable)
      return NextResponse.json(
        { error: 'Listing is already booked for this date' },
        { status: 400 },
      );

    const totalPrice = new Decimal(listing.price).mul(new Decimal(duration));

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        listingId: validatedData.listingId,
        startDate,
        endDate,
        guests: validatedData.guests,
        totalPrice,
      },
    });

    await redis.set(
      `booking:${validatedData.listingId}:${validatedData.startDate}`,
      'booked',
      { ex: 86400 },
    );

    await queue.add('booking-confirmation', {
      bookingId: booking.id,
      userId: user.id,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
