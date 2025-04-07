import Link from "next/link"
import { db } from "~/server/db"
import { LatestPost } from "~/app/_components/post"
import { auth } from "~/server/auth"
import { api, HydrateClient } from "~/trpc/server"
import ClassroomTable from "~/app/_components/classroom/classroomTable"
import {pageHeaderStyle} from "~/styles/daisystyles"
import {PlusIcon} from "@heroicons/react/16/solid"
import { AddClassroom } from "../_components/classroom/addClassroom"

export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  const classrooms = await db.classroom.findMany()

  return (
    <HydrateClient>
      <main>
        {role}
        <h2 className = {pageHeaderStyle}>Кабинеты</h2>
        <div className = "inline-flex">
          <ClassroomTable classrooms = {classrooms} mode = {role} />
          {role === "ADMIN" && <AddClassroom />}
        </div>
      </main>
    </HydrateClient>
  )
}
