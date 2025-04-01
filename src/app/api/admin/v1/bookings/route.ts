import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";

/**
 * @swagger
 * /api/admin/v1/bookings:
 *   get:
 *     summary: Get all bookings with analytics
 *     description: Admins can retrieve all bookings with pagination, total bookings, and revenue stats.
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of bookings per page (default is 10)
 *     responses:
 *       200:
 *         description: List of bookings with analytics
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  try {
    const admin = authMiddleware(req);
    if (!admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const skip = (page - 1) * limit;

    const [bookings, totalBookings, totalRevenue] = await prisma.$transaction([
      prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          userId: true,
          listingId: true,
          startDate: true,
          endDate: true,
          guests: true,
          totalPrice: true,
          createdAt: true,
        },
      }),
      prisma.booking.count(),
      prisma.booking.aggregate({ _sum: { totalPrice: true } }),
    ]);

    return NextResponse.json({
      totalBookings,
      totalRevenue: totalRevenue._sum.totalPrice
        ? Number(totalRevenue._sum.totalPrice)
        : 0, // Ensure it's a number
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
