import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET as string;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("Missing required environment variables");
}

async function ensureAdminExists() {
  let admin = await prisma.admin.findUnique({ where: { email: ADMIN_EMAIL } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    admin = await prisma.admin.create({
      data: { email: ADMIN_EMAIL, password: hashedPassword },
    });
  }
}

ensureAdminExists();

export async function authenticateAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, admin };
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
