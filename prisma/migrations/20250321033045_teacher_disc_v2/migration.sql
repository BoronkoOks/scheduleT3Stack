-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_discTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_teacherDiscId_fkey";

-- AlterTable
ALTER TABLE "Discipline" ALTER COLUMN "discTeacherId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "teacherDiscId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_teacherDiscId_fkey" FOREIGN KEY ("teacherDiscId") REFERENCES "TeacherDiscipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_discTeacherId_fkey" FOREIGN KEY ("discTeacherId") REFERENCES "TeacherDiscipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
