import { auth } from "~/server/auth"
import { db } from "~/server/db"
import { api, HydrateClient } from "~/trpc/server"
import TeacherTable from "../_components/teacher/teacherTable"
import { AddTeacher } from "../_components/teacher/addTeacher"
import Pagination from "../ui/pagination"
import SearchInput from "~/app/ui/searchInput"
import React from "react"


export default async function Home(props: {searchParams: Promise<{ query?: string; page?: string }>}) {
  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const page = Number(searchParams?.page) || 1
  const size = 10

  const whereTeachers = { surname: {startsWith: query, mode: 'insensitive'}}

  const teachers = await db.teacher.findMany({
    where: whereTeachers,
    orderBy: [
      {surname: "asc"},
      {name: "asc"},
      {fathername: "asc"}
    ],
    skip: (page - 1) * size,
    take: size
  })

  const count = await db.teacher.count({
    where: whereTeachers
  })

  
  const pages = Math.ceil(Number(count) / size)

  return (
    <HydrateClient>
      <main className = "bg-gray-100">
        <table>
          <tbody>
          <tr>
            <td className = "align-top pl-6 pb-6">
              <h2 className = "ml-2 mb-4 font-bold">Преподаватели</h2>
              <SearchInput placeholder="Найти преподавателя..." />
              <TeacherTable teachers = {teachers} page = {page} />
              <Pagination totalPages={pages} />
            </td>
            <td className = "align-top pt-8 pl-6">
              {role === "ADMIN" && <AddTeacher />}
            </td>
          </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  )
}
