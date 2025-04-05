import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";

/**
 * @swagger
 * /api/admin/v1/hosts:
 *   get:
 *     summary: Get all users who are hosts
 *     description: Fetches all hosts with their details, including verification status and listings count.
 *     tags: [Hosts]
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
 *         description: Number of hosts per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of hosts with their details
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

    const [hosts, totalHosts] = await prisma.$transaction([
      prisma.user.findMany({
        where: { host: { isNot: null } },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          picture: true,
          isHostApproved: true,
          createdAt: true,
          host: {
            select: {
              phoneNumber: true,
              bio: true,
              idVerificationStatus: true,
              businessName: true,
              businessLogo: true,
              businessRegistrationNumber: true,
              businessAddress: true,
              socialMediaLinks: true,
              hostRating: true,
              asBusiness: true,
              createdAt: true,
            },
          },
          _count: { select: { listings: true } },
        },
      }),
      prisma.user.count({ where: { host: { isNot: null } } }),
    ]);

    return NextResponse.json({
      totalHosts,
      hosts: hosts.map((host: any) => ({
        ...host,
        createdAt: host.createdAt.toISOString(),
        host: host.host
          ? { ...host.host, createdAt: host.host.createdAt.toISOString() }
          : null,
      })),
    });
  } catch (error) {
    console.error("Error fetching hosts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
