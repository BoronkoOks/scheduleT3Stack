/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `disciplineId` on table `TeacherDiscipline` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `TeacherDiscipline` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'ELDER', 'STUDENT');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TeacherDiscipline" DROP CONSTRAINT "TeacherDiscipline_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherDiscipline" DROP CONSTRAINT "TeacherDiscipline_teacherId_fkey";

-- AlterTable
ALTER TABLE "TeacherDiscipline" ALTER COLUMN "disciplineId" SET NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Speciality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "years" INTEGER NOT NULL,

    CONSTRAINT "Speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "students" INTEGER NOT NULL,
    "specialityId" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscSpec" (
    "id" TEXT NOT NULL,
    "specialityId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "DiscSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicPlan" (
    "id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "lestures" INTEGER NOT NULL,
    "practise" INTEGER NOT NULL,
    "labs" INTEGER NOT NULL,
    "ksr" INTEGER NOT NULL,
    "coursework" BOOLEAN DEFAULT false,
    "exam" BOOLEAN DEFAULT false,
    "discSpecId" TEXT NOT NULL,

    CONSTRAINT "AcademicPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "projector" BOOLEAN NOT NULL DEFAULT false,
    "computers" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "evenWeek" BOOLEAN NOT NULL DEFAULT false,
    "day" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomID" TEXT NOT NULL,
    "subgroup" INTEGER,
    "lessontype" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscSpec" ADD CONSTRAINT "DiscSpec_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscSpec" ADD CONSTRAINT "DiscSpec_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicPlan" ADD CONSTRAINT "AcademicPlan_discSpecId_fkey" FOREIGN KEY ("discSpecId") REFERENCES "DiscSpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_classroomID_fkey" FOREIGN KEY ("classroomID") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
