/*
  Warnings:

  - You are about to drop the column `description` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `expectedStatusCode` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `maxResponseTime` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `timeout` on the `Monitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Monitor" DROP COLUMN "description",
DROP COLUMN "expectedStatusCode",
DROP COLUMN "maxResponseTime",
DROP COLUMN "timeout";
