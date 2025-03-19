import { prisma } from '@heuvera/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/listings/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     description: Retrieve details of a specific listing by its ID, including host details.
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the listing to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listing:
 *                   type: object
 *       400:
 *         description: Listing ID is required.
 *       404:
 *         description: Listing not found.
 *       500:
 *         description: Internal server error.
 */
export async function GET(context: unknown): Promise<NextResponse> {
  const { params } = context as { params: { id: string } };

  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 },
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: { host: true },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
