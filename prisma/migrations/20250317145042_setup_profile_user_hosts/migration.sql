-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isHostApproved" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Host" (
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "bio" TEXT,
    "governmentId" TEXT,
    "idVerificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "businessName" TEXT,
    "businessLogo" TEXT,
    "businessRegistrationNumber" TEXT,
    "businessAddress" TEXT,
    "socialMediaLinks" JSONB,
    "hostRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "asBusiness" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
