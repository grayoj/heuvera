import { getOrCreateUser } from '@heuvera/lib/auth';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateListingSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  price: z.number().optional(),
  listingType: z.string().optional(),
  category: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  available: z.boolean().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1).optional(),
});

/**
 * @swagger
 * /api/v1/listings:
 *   patch:
 *     summary: Update a property listing
 *     description: Allows an approved host to update an existing property listing.
 *     tags:
 *       - Listings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the listing to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *               listingType:
 *                 type: string
 *               category:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               checkInTime:
 *                 type: string
 *               checkOutTime:
 *                 type: string
 *               available:
 *                 type: boolean
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listing:
 *                   type: object
 *       400:
 *         description: Bad request - Validation failed or missing listing ID
 *       401:
 *         description: Unauthorized - User not found
 *       403:
 *         description: Forbidden - User is not an approved host
 */
export async function PATCH(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { isHostApproved: true },
    });

    if (!dbUser?.isHostApproved) {
      return NextResponse.json(
        { error: 'User is not approved as a host' },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get('id');

    if (!listingId) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 },
      );
    }

    const body = await req.json();
    const validatedData = updateListingSchema.parse(body);

    const listing = await prisma.listing.update({
      where: { id: listingId, hostId: user.id },
      data: validatedData,
    });

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 400 },
    );
  }
}
