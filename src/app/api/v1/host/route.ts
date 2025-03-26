import { getOrCreateUser } from "@heuvera/lib/auth";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const hostSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
  bio: z.string().optional(),
  governmentId: z.string().optional(),
  idVerificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]).optional(),
  businessName: z.string().optional(),
  businessLogo: z.string().url().optional(),
  businessRegistrationNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  socialMediaLinks: z.record(z.string()).optional(),
  asBusiness: z.boolean().optional(),
});

/**
 * @swagger
 * /api/v1/host:
 *   patch:
 *     summary: Update host details
 *     description: Updates host profile details. Only approved hosts can update their information.
 *     tags:
 *       - Host
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 15
 *               bio:
 *                 type: string
 *               governmentId:
 *                 type: string
 *               idVerificationStatus:
 *                 type: string
 *                 enum: [PENDING, VERIFIED, REJECTED]
 *               businessName:
 *                 type: string
 *               businessLogo:
 *                 type: string
 *                 format: url
 *               businessRegistrationNumber:
 *                 type: string
 *               businessAddress:
 *                 type: string
 *               socialMediaLinks:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *               asBusiness:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated the host profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 host:
 *                   type: object
 *       401:
 *         description: Unauthorized. User must be authenticated.
 *       403:
 *         description: Forbidden. User is not an approved host.
 *       400:
 *         description: Bad Request. Invalid input data.
 */
export async function PATCH(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.isHostApproved) {
      return NextResponse.json(
        { error: "User is not approved as a host" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const validatedData = hostSchema.parse(body);

    const updatedHost = await prisma.host.upsert({
      where: { userId: user.id },
      update: validatedData,
      create: { userId: user.id, ...validatedData },
    });

    return NextResponse.json({ host: updatedHost }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating host:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}
