-- AlterTable
ALTER TABLE "volume" ALTER COLUMN "darwinPath" DROP NOT NULL,
ALTER COLUMN "linuxPath" DROP NOT NULL,
ALTER COLUMN "winPath" DROP NOT NULL;
