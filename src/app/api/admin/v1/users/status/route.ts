import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@heuvera/lib/prisma";
import { authMiddleware } from "@heuvera/lib/admin/middleware";
import { sendEmail } from "@heuvera/lib/email";
import { getHostApprovalMail } from "@heuvera/lib/email/render";

/**
 * @swagger
 * /api/admin/v1/users/status:
 *   patch:
 *     summary: Update user account status
 *     description: Admins can change a user's account status (Enabled, Suspended, Banned).
 *     tags: [Users]
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
 *               status:
 *                 type: string
 *                 enum: [ENABLED, SUSPENDED, BANNED]
 *                 example: "SUSPENDED"
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User status updated to SUSPENDED"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const adminResult = authMiddleware(req);
    // If authMiddleware returns a falsy value or a string, return an Unauthorized response.
    if (!adminResult || typeof adminResult === "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, status } = await req.json();
    if (!userId || !status) {
      return NextResponse.json(
        { error: "User ID and status are required" },
        { status: 400 },
      );
    }

    if (!["ENABLED", "SUSPENDED", "BANNED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { accountStatus: status },
    });

    const emailBody = await getHostApprovalMail(
      user.name ?? "there",
      "https://heuvera.com/dashboard",
    );
    await sendEmail(user.email, "Host Approval Confirmation", emailBody);

    return NextResponse.json(
      { message: `User status updated to ${status}` },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
