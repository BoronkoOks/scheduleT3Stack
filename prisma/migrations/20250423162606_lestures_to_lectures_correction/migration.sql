/*
  Warnings:

  - You are about to drop the column `lestures` on the `AcademicPlan` table. All the data in the column will be lost.
  - Added the required column `lectures` to the `AcademicPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicPlan" DROP COLUMN "lestures",
ADD COLUMN     "lectures" INTEGER NOT NULL;
