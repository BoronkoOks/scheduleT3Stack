import { HydrateClient } from "~/trpc/server"
import DisciplineTable from "~/app/_components/discipline/disciplineTable"
import { db } from "~/server/db"
import { AddDiscipline } from "~/app/_components/discipline/addDiscipline"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"


export default async function Home(props:
  {searchParams: Promise<{ query?: string; page?: string }>}
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const page = Number(searchParams?.page) || 1
  const size = 10

  const whereDisciplines = { name: {startsWith: query, mode: 'insensitive'}}
  
  const disciplines = await db.discipline.findMany({
    where: whereDisciplines,
    orderBy: {name: "asc"},
    skip: (page - 1) * size,
    take: size
  })

  const count = await db.discipline.count({
      where: whereDisciplines
    })

  const pages = Math.ceil(Number(count) / size)

  return (
    <HydrateClient>
      <main>
      <table>
          <tbody>
          <tr>
            <td className = "align-top pl-6 pb-6">
              <h2 className = "ml-2 mb-4 font-bold">Дисциплины</h2>
              <SearchInput placeholder = "Найти дисциплину..." />
              <DisciplineTable disciplines = {disciplines} mode = {role} page = {page} />
              <Pagination totalPages={pages} />
            </td>
            <td className = "align-top pt-8 pl-6">
              {role == "ADMIN" && <AddDiscipline />}
            </td>
          </tr>
        </tbody>
      </table>
      </main>
    </HydrateClient>
  )
}
