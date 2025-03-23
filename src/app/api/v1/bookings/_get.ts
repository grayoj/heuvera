import { getOrCreateUser } from '@heuvera/lib/auth';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get user bookings
 *     description: Fetches all bookings made by the authenticated user.
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                       listingId:
 *                         type: string
 *                         format: uuid
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *                       guests:
 *                         type: integer
 *                       totalPrice:
 *                         type: number
 *                       listing:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           title:
 *                             type: string
 *                           price:
 *                             type: number
 *       401:
 *         description: Unauthorized, user not logged in.
 *       500:
 *         description: Internal server error.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
