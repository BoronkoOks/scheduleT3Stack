import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { db } from "~/server/db"
import { api, HydrateClient } from "~/trpc/server";
import TeacherTable from "../_components/teacher/teacherTable"
import { AddTeacher } from "../_components/teacher/addTeacher"
import {pageHeaderStyle} from "~/styles/daisystyles"


export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  const teachers = await db.teacher.findMany()

  return (
    <HydrateClient>
      <main>
        {role}
        <table>
          <tbody>
          <tr>
            <td className = "align-top">
        <h2 className = {pageHeaderStyle}>Преподаватели</h2>
            <TeacherTable teachers = {teachers} />
          </td>
          <td className = "align-top">
          {role === "ADMIN" && <AddTeacher />}
          </td>
        </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  )
}
