import { getOrCreateUser } from '@heuvera/lib/auth';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/v1/listings:
 *   delete:
 *     summary: Delete a property listing
 *     description: Allows an approved host to delete one of their property listings.
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the listing to delete.
 *     responses:
 *       200:
 *         description: Listing deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 listing:
 *                   type: object
 *       400:
 *         description: Listing ID is required or validation failed.
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *       403:
 *         description: Forbidden - User is not approved as a host.
 */
export async function DELETE(req: NextRequest) {
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

    const deletedListing = await prisma.listing.delete({
      where: { id: listingId, hostId: user.id },
    });

    return NextResponse.json(
      { message: 'Listing deleted', listing: deletedListing },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 400 },
    );
  }
}
