-- CreateTable
CREATE TABLE "config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "volume" (
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "video" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "archived" TEXT NOT NULL,
    "volumeName" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "config_key_key" ON "config"("key");

-- CreateIndex
CREATE UNIQUE INDEX "volume_name_key" ON "volume"("name");

-- CreateIndex
CREATE UNIQUE INDEX "video_slug_key" ON "video"("slug");

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_volumeName_fkey" FOREIGN KEY ("volumeName") REFERENCES "volume"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
