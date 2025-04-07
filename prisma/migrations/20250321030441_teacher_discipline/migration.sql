/*
  Warnings:

  - Added the required column `teacherDiscId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "teacherDiscId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "semesters" INTEGER,
    "subgroups" BOOLEAN DEFAULT false,
    "discTeacherId" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherDiscipline" (
    "id" TEXT NOT NULL,
    "lectures" BOOLEAN DEFAULT true,
    "subgroup" INTEGER,

    CONSTRAINT "TeacherDiscipline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_teacherDiscId_fkey" FOREIGN KEY ("teacherDiscId") REFERENCES "TeacherDiscipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_discTeacherId_fkey" FOREIGN KEY ("discTeacherId") REFERENCES "TeacherDiscipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
