/*
  Warnings:

  - The `status` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `archived` on the `video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'published', 'archived');

-- AlterTable
ALTER TABLE "video" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT E'active',
DROP COLUMN "created",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "archived",
ADD COLUMN     "archived" TIMESTAMP(3) NOT NULL;
