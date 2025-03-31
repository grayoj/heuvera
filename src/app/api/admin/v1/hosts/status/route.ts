import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";
import { sendEmail } from "@heuvera/lib/email";
import { getHostApprovalMail } from "@heuvera/lib/email/render";

/**
 * @swagger
 * /api/admin/v1/status/hosts:
 *   patch:
 *     summary: Approve a host
 *     description: Admins can approve users as hosts by setting isHostApproved to true.
 *     tags: [Hosts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Host approved successfully
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
export async function PATCH(req: NextRequest) {
  try {
    const admin = authMiddleware(req);
    if (!admin) return admin;

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isHostApproved: true },
    });

    const emailBody = await getHostApprovalMail(
      user.name ?? "there",
      "https://heuvera.com/dashboard",
    );
    await sendEmail(user.email, "Host Approval Confirmation", emailBody);

    return NextResponse.json({ message: "Host approved successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error approving host:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

