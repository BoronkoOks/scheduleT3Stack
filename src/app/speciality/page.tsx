import { HydrateClient } from "~/trpc/server"
import { db } from "~/server/db"
import SpecialityTable from "~/app/_components/speciality/specialityTable"
import {AddSpeciality} from "~/app/_components/speciality/addSpeciality"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"
import { metadata } from "../layout"

export default async function Home(props:
  {searchParams: Promise<{ query?: string; page?: string }>}
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  let page = Number(searchParams?.page) || 1
  const size = 10
  
  metadata.title = "Специальности"

  const whereSpecialities = {
    OR: [
      { name: {startsWith: query, mode: 'insensitive'}},
      { code: {startsWith: query, mode: 'insensitive'}}
    ]
  }
  
  const specialities = await db.speciality.findMany({
    where: whereSpecialities,
    orderBy: {name: "asc"},
    skip: (page - 1) * size,
    take: size
  })

  const count = await db.speciality.count({
      where: whereSpecialities
    })

  const pages = Math.ceil(Number(count) / size)


  return (
    <HydrateClient>
      <main>
        <table>
          <tbody>
          <tr>
            <td className = "align-top pl-6 pb-6">
              <h2 className = "ml-2 mb-4 font-bold">Специальности</h2>
              <SearchInput placeholder = "Найти специальность..." />
              <SpecialityTable specialities = {specialities} mode = {role} page = {page} />
              <Pagination totalPages = {pages} />
          </td>
          <td className = "align-top pt-8 pl-6">
            {role === "ADMIN" && <AddSpeciality />}
          </td>
        </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  )
}
