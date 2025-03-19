import { getOrCreateUser } from '@heuvera/lib/auth';
import { prisma } from '@heuvera/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const profileSchema = z.object({
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  isStudent: z.boolean().optional(),
  isEmployed: z.boolean().optional(),
  occupation: z.string().optional(),
  incomeRange: z.string().optional(),
  interests: z.array(z.string()).optional(),
  preferredRentRange: z.string().optional(),
  preferredListingTypes: z.array(z.string()).optional(),
  moveInDate: z.string().optional(),
  stayDuration: z.string().optional(),
  hasPets: z.boolean().optional(),
  hasChildren: z.boolean().optional(),
  smoking: z.boolean().optional(),
});

/**
 * @swagger
 * /api/v1/profile:
 *   patch:
 *     summary: Update or create user profile
 *     description: Updates the user's profile if it exists, otherwise creates a new one.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               isStudent:
 *                 type: boolean
 *               isEmployed:
 *                 type: boolean
 *               occupation:
 *                 type: string
 *               incomeRange:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferredRentRange:
 *                 type: string
 *               preferredListingTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *               moveInDate:
 *                 type: string
 *               stayDuration:
 *                 type: string
 *               hasPets:
 *                 type: boolean
 *               hasChildren:
 *                 type: boolean
 *               smoking:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *       401:
 *         description: Unauthorized - User not found
 *       400:
 *         description: Bad request - Validation failed
 */
export async function PATCH(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: validatedData,
      create: { userId: user.id, ...validatedData },
    });

    return NextResponse.json({ profile: updatedProfile }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 400 },
    );
  }
}
