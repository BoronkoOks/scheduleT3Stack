/*
  Warnings:

  - Added the required column `lesson` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "lesson" INTEGER NOT NULL;
