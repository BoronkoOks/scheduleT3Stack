import { auth } from "~/server/auth"
import { db } from "~/server/db"
import { api, HydrateClient } from "~/trpc/server"
import TeacherTable from "../_components/teacher/teacherTable"
import { AddTeacher } from "../_components/teacher/addTeacher"
import Pagination from "../ui/pagination"
import SearchInput from "~/app/ui/searchInput"
import React from "react"
import { getRole } from "~/app/api/auth/check"
import { metadata } from "../layout"


export default async function Home(props:
  {searchParams: Promise<{ query?: string; page?: string }>}
) {
  const role = (await getRole())

  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const page = Number(searchParams?.page) || 1
  const size = 10

  metadata.title = "Преподаватели"

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
              <TeacherTable teachers = {teachers} page = {page} mode = {role} />
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
