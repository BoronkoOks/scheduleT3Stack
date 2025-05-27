import { db } from "~/server/db"
import { HydrateClient } from "~/trpc/server"
import ClassroomTable from "~/app/_components/classroom/classroomTable"
import { AddClassroom } from "../_components/classroom/addClassroom"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"

export default async function Home(props:
  {searchParams: Promise<{ query?: string; page?: string }>}
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  let page = Number(searchParams?.page) || 1
  const size = 10

  const whereClassrooms = { name: {startsWith: query, mode: 'insensitive'}}
    
  const classrooms = await db.classroom.findMany({
    where: whereClassrooms,
    orderBy: {name: "asc"},
    skip: (page - 1) * size,
    take: size
  })
  
  const count = await db.classroom.count({
      where: whereClassrooms
    })
  
  const pages = Math.ceil(Number(count) / size)

  return (
    <HydrateClient>
      <main>
      <table>
        <tbody>
          <tr>
            <td className = "align-top pl-6 pb-6">
              <h2 className = "ml-2 mb-4 font-bold">Кабинеты</h2>
              <SearchInput placeholder = "Найти кабинет..." />
              <ClassroomTable classrooms = {classrooms} mode = {role} page = {page} />
              <Pagination totalPages = {pages} />
            </td>
            <td className = "align-top pt-8 pl-6">
            {role === "ADMIN" && <AddClassroom />}
            </td>
          </tr>
        </tbody>
      </table>
      </main>
    </HydrateClient>
  )
}
