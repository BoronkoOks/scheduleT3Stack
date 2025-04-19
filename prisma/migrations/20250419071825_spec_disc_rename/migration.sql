/*
  Warnings:

  - You are about to drop the column `discSpecId` on the `AcademicPlan` table. All the data in the column will be lost.
  - You are about to drop the `DiscSpec` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specDiscId` to the `AcademicPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcademicPlan" DROP CONSTRAINT "AcademicPlan_discSpecId_fkey";

-- DropForeignKey
ALTER TABLE "DiscSpec" DROP CONSTRAINT "DiscSpec_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "DiscSpec" DROP CONSTRAINT "DiscSpec_specialityId_fkey";

-- AlterTable
ALTER TABLE "AcademicPlan" DROP COLUMN "discSpecId",
ADD COLUMN     "specDiscId" TEXT NOT NULL;

-- DropTable
DROP TABLE "DiscSpec";

-- CreateTable
CREATE TABLE "SpecialityDisc" (
    "id" TEXT NOT NULL,
    "specialityId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "SpecialityDisc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialityDisc" ADD CONSTRAINT "SpecialityDisc_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialityDisc" ADD CONSTRAINT "SpecialityDisc_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicPlan" ADD CONSTRAINT "AcademicPlan_specDiscId_fkey" FOREIGN KEY ("specDiscId") REFERENCES "SpecialityDisc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
