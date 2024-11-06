-- AlterTable
ALTER TABLE "monitorCheck" ADD COLUMN     "monitorId" INTEGER;

-- CreateTable
CREATE TABLE "Monitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "frequency" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "timeout" INTEGER NOT NULL DEFAULT 30000,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "expectedStatusCode" INTEGER NOT NULL DEFAULT 200,
    "maxResponseTime" INTEGER,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_url_key" ON "Monitor"("url");

-- CreateIndex
CREATE INDEX "monitorCheck_monitorId_idx" ON "monitorCheck"("monitorId");

-- AddForeignKey
ALTER TABLE "monitorCheck" ADD CONSTRAINT "monitorCheck_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
