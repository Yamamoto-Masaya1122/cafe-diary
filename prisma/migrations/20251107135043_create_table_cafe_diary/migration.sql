-- CreateTable
CREATE TABLE "CafeDiary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CafeDiary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CafeDiary" ADD CONSTRAINT "CafeDiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
