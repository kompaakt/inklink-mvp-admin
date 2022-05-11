-- CreateTable
CREATE TABLE "artists" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 1,
    "tg" TEXT,
    "userId" UUID,
    "isPublished" BOOLEAN DEFAULT false,
    "isOwned" BOOLEAN DEFAULT false,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "done_tattoos" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "artistId" UUID NOT NULL,

    CONSTRAINT "done_tattoos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sketches" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "artistId" UUID NOT NULL,

    CONSTRAINT "sketches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selections" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "content" TEXT,
    "position" INTEGER,
    "weight" DOUBLE PRECISION,
    "coverImage" TEXT,
    "abstract" TEXT,
    "coverImageWide" TEXT,
    "featured" BOOLEAN,
    "featuredFrom" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "featuredTo" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selection_entries" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "selectionId" UUID NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL,
    "artistId" UUID,
    "doneTattooId" UUID,
    "sketchId" UUID,
    "tattooStyleId" UUID,
    "studioId" UUID,

    CONSTRAINT "selection_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tattoo_styles" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "tattoo_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_ranges" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "artistId" UUID NOT NULL,
    "rangeStart" INTEGER NOT NULL,
    "rangeEnd" INTEGER,
    "relativeCost" DOUBLE PRECISION,
    "currency" TEXT NOT NULL,

    CONSTRAINT "price_ranges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "country" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "long" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToLocation" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistToTattooStyle" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_DoneTattooToTattooStyle" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SketchToTattooStyle" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToSelection" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_userId_key" ON "artists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "price_ranges_artistId_key" ON "price_ranges"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToLocation_AB_unique" ON "_ArtistToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToLocation_B_index" ON "_ArtistToLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToTattooStyle_AB_unique" ON "_ArtistToTattooStyle"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToTattooStyle_B_index" ON "_ArtistToTattooStyle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DoneTattooToTattooStyle_AB_unique" ON "_DoneTattooToTattooStyle"("A", "B");

-- CreateIndex
CREATE INDEX "_DoneTattooToTattooStyle_B_index" ON "_DoneTattooToTattooStyle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SketchToTattooStyle_AB_unique" ON "_SketchToTattooStyle"("A", "B");

-- CreateIndex
CREATE INDEX "_SketchToTattooStyle_B_index" ON "_SketchToTattooStyle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToSelection_AB_unique" ON "_LocationToSelection"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToSelection_B_index" ON "_LocationToSelection"("B");

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "done_tattoos" ADD CONSTRAINT "done_tattoos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sketches" ADD CONSTRAINT "sketches_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selection_entries" ADD CONSTRAINT "selection_entries_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selection_entries" ADD CONSTRAINT "selection_entries_doneTattooId_fkey" FOREIGN KEY ("doneTattooId") REFERENCES "done_tattoos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selection_entries" ADD CONSTRAINT "selection_entries_sketchId_fkey" FOREIGN KEY ("sketchId") REFERENCES "sketches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selection_entries" ADD CONSTRAINT "selection_entries_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES "selections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selection_entries" ADD CONSTRAINT "selection_entries_tattooStyleId_fkey" FOREIGN KEY ("tattooStyleId") REFERENCES "tattoo_styles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_ranges" ADD CONSTRAINT "price_ranges_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToLocation" ADD CONSTRAINT "_ArtistToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToLocation" ADD CONSTRAINT "_ArtistToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTattooStyle" ADD CONSTRAINT "_ArtistToTattooStyle_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTattooStyle" ADD CONSTRAINT "_ArtistToTattooStyle_B_fkey" FOREIGN KEY ("B") REFERENCES "tattoo_styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoneTattooToTattooStyle" ADD CONSTRAINT "_DoneTattooToTattooStyle_A_fkey" FOREIGN KEY ("A") REFERENCES "done_tattoos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoneTattooToTattooStyle" ADD CONSTRAINT "_DoneTattooToTattooStyle_B_fkey" FOREIGN KEY ("B") REFERENCES "tattoo_styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SketchToTattooStyle" ADD CONSTRAINT "_SketchToTattooStyle_A_fkey" FOREIGN KEY ("A") REFERENCES "sketches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SketchToTattooStyle" ADD CONSTRAINT "_SketchToTattooStyle_B_fkey" FOREIGN KEY ("B") REFERENCES "tattoo_styles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToSelection" ADD CONSTRAINT "_LocationToSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToSelection" ADD CONSTRAINT "_LocationToSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "selections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
