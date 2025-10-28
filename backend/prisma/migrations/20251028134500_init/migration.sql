-- CreateTable
CREATE TABLE "Tow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicle" TEXT NOT NULL,
    "pickup" TEXT NOT NULL,
    "dropoff" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
