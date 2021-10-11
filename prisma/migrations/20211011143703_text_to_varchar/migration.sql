/*
  Warnings:

  - You are about to alter the column `slug` on the `video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `title` on the `video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `youtube` on the `video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - You are about to alter the column `volumeName` on the `video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5000)`.
  - You are about to alter the column `name` on the `volume` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[title]` on the table `video` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_volumeName_fkey";

-- AlterTable
ALTER TABLE "video" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "youtube" DROP NOT NULL,
ALTER COLUMN "youtube" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "volumeName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(5000),
ALTER COLUMN "archived" DROP NOT NULL;

-- AlterTable
ALTER TABLE "volume" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "video_title_key" ON "video"("title");

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_volumeName_fkey" FOREIGN KEY ("volumeName") REFERENCES "volume"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
