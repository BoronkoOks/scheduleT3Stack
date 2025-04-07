/*
  Warnings:

  - You are about to drop the column `discTeacherId` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `teacherDiscId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_discTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_teacherDiscId_fkey";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "discTeacherId";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "teacherDiscId";

-- AlterTable
ALTER TABLE "TeacherDiscipline" ADD COLUMN     "disciplineId" TEXT,
ADD COLUMN     "teacherId" TEXT;

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
