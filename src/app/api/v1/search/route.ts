import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search listings
 *     description: Search for listings based on filters like title, category, city, country, price range, and amenities.
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by title (case-insensitive).
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category.
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city.
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price.
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: string
 *         description: Filter by listing type.
 *       - in: query
 *         name: amenities
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter by amenities (comma-separated).
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Pagination - Page number.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           default: 10
 *         description: Number of results per page.
 *     responses:
 *       200:
 *         description: Successfully retrieved listings.
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const schema = z.object({
      title: z.string().optional(),
      category: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      minPrice: z.string().transform(Number).optional(),
      maxPrice: z.string().transform(Number).optional(),
      listingType: z.string().optional(),
      amenities: z.string().optional(),
      page: z.string().transform(Number).default('1'),
      pageSize: z.string().transform(Number).default('10'),
    });

    const parsed = schema.parse(params);
    const { title, category, city, country, minPrice, maxPrice, listingType, amenities, page, pageSize } = parsed;

    const amenitiesArray = amenities ? amenities.split(',') : [];

    const where: any = {
      AND: [
        title ? { title: { contains: title, mode: 'insensitive' } } : {},
        category ? { category } : {},
        city ? { city } : {},
        country ? { country } : {},
        minPrice ? { price: { gte: new Decimal(minPrice) } } : {},
        maxPrice ? { price: { lte: new Decimal(maxPrice) } } : {},
        listingType ? { listingType } : {},
        amenitiesArray.length > 0 ? { amenities: { array_contains: amenitiesArray } } : {},
      ],
    };

    const take = Math.min(Number(pageSize), 50);
    const skip = (Number(page) - 1) * take;

    const listings = await prisma.listing.findMany({
      where,
      take,
      skip,
      include: { host: true },
    });

    return NextResponse.json({ listings, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error('Error searching listings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

