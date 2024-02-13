-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "color" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnBookmarks" (
    "bookmarkId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnBookmarks_pkey" PRIMARY KEY ("bookmarkId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_url_key" ON "Bookmark"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnBookmarks" ADD CONSTRAINT "TagsOnBookmarks_bookmarkId_fkey" FOREIGN KEY ("bookmarkId") REFERENCES "Bookmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnBookmarks" ADD CONSTRAINT "TagsOnBookmarks_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
