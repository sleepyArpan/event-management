-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "from" BIGINT NOT NULL,
    "to" BIGINT NOT NULL
);
