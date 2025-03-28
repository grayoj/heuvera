import { getOrCreateUser } from "@heuvera/lib/auth";
import { sendEmail } from "@heuvera/lib/email";
import { getListingConfirmationMail } from "@heuvera/lib/email/render";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const listingSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.number(),
  listingType: z.string(),
  category: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  available: z.boolean().optional().default(true),
  amenities: z.array(z.string()),
  images: z.array(z.string()).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { isHostApproved: true, name: true, email: true },
    });

    if (!dbUser?.isHostApproved) {
      return NextResponse.json(
        { error: "User is not approved as a host" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = listingSchema.parse(body);

    const listing = await prisma.listing.create({
      data: {
        ...validatedData,
        hostId: user.id,
      },
    });

    const hostName = dbUser.name ?? "there";
    const emailBody = await getListingConfirmationMail(
      hostName,
      listing.title,
      listing.images[0],
      `https://heuvera.com/explore/${listing.id}`
    );

    await sendEmail(dbUser.email, "Your Listing Has Been Created!", emailBody);

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
}
