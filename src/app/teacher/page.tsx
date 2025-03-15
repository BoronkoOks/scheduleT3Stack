import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { db } from "~/server/db"
import { api, HydrateClient } from "~/trpc/server";
import TeacherTable from "../_components/teacher/teacherTable"
import { AddTeacher } from "../_components/teacher/addTeacher"


export default async function Home() {
  const teachers = await db.teacher.findMany()

  return (
    <HydrateClient>
      <main>
        <h2 className = "m-4 text-lg font-bold">Преподаватели</h2>
        <div className = " inline-flex">
        <TeacherTable teachers = {teachers} />
        <AddTeacher />
        </div>
      </main>
    </HydrateClient>
  )
}
