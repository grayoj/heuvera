import { HEUVERA_API_KEY } from "@heuvera/lib/constants";
import { prisma } from "@heuvera/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  auth0_id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  picture: z.string().url().nullable(),
  created_at: z.string().datetime(),
});

type ApiResponse<T> = NextResponse<{
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}>;

const createResponse = <T>(
  status: number,
  data?: T,
  error?: string,
  details?: unknown,
): ApiResponse<T> => {
  return NextResponse.json(
    data ? { success: true, data } : { success: false, error, details },
    { status },
  );
};

/**
 * @swagger
 * /api/auth/user:
 *   post:
 *     summary: Create a user
 *     description: This endpoint creates a new user based on the provided Auth0 ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - auth0_id
 *               - email
 *               - created_at
 *             properties:
 *               auth0_id:
 *                 type: string
 *                 description: The unique identifier for the user from Auth0.
 *                 example: "auth0|123456789"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 nullable: true
 *                 description: The user's full name.
 *                 example: "John Doe"
 *               picture:
 *                 type: string
 *                 format: url
 *                 nullable: true
 *                 description: URL to the user's profile picture.
 *                 example: "https://example.com/avatar.jpg"
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: The user's account creation date.
 *                 example: "2025-03-16T12:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully created or updated the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: The created or updated user object.
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Details about validation errors.
 *       401:
 *         description: Unauthorized request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
export async function POST(
  req: NextRequest,
): Promise<ApiResponse<{ user: unknown }>> {
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (authHeader !== `Bearer ${HEUVERA_API_KEY}`) {
      return createResponse(401, undefined, "Unauthorized");
    }

    const body = await req.json();
    const parsedBody = userSchema.parse(body);
    const { auth0_id, email, name, picture, created_at } = parsedBody;

    const user = await prisma.user.upsert({
      where: { auth0_id },
      update: {},
      create: {
        auth0_id,
        email,
        name,
        picture,
        createdAt: new Date(created_at),
      },
    });

    return createResponse(200, { user });
  } catch (error) {
    console.error("Error storing user:", error);

    if (error instanceof z.ZodError) {
      return createResponse(400, undefined, "Invalid input", error.errors);
    }

    return createResponse(500, undefined, "Internal Server Error");
  }
}
