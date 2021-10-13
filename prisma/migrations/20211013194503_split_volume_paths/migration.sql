/*
  Warnings:

  - You are about to drop the column `path` on the `volume` table. All the data in the column will be lost.
  - Added the required column `darwinPath` to the `volume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linuxPath` to the `volume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winPath` to the `volume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "volume" DROP COLUMN "path",
ADD COLUMN     "darwinPath" VARCHAR(1000) NOT NULL,
ADD COLUMN     "linuxPath" VARCHAR(1000) NOT NULL,
ADD COLUMN     "winPath" VARCHAR(500) NOT NULL;
