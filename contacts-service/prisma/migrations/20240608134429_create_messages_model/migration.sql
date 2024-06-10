/*
  Warnings:

  - You are about to drop the column `createdAt` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `isAbleToReceiveMessage` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `contacts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PRODUCED', 'ERROR', 'NOT_ABLE');

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "createdAt",
DROP COLUMN "isAbleToReceiveMessage",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_able_to_receive_message" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "email_template_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status_message" TEXT NOT NULL,
    "status_type" "StatusType" NOT NULL DEFAULT 'PRODUCED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
