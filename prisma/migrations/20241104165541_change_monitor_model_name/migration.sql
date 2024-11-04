-- CreateTable
CREATE TABLE "monitorCheck" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "statusCode" INTEGER,
    "responseTime" INTEGER,
    "error" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitorCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "monitorCheck_url_timestamp_idx" ON "monitorCheck"("url", "timestamp");
