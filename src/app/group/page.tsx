import Link from "next/link"
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { db } from "~/server/db"
import GroupTable from "~/app/_components/group/groupTable"
import { AddGroup } from "../_components/group/addGroup"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"
import { metadata } from "../layout";


export default async function Home(props:
  {searchParams: Promise<{ query?: string; page?: string }>}
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const page = Number(searchParams?.page) || 1
  const size = 10
  
  metadata.title = "Группы"

  const whereGroups = { name: {startsWith: query, mode: 'insensitive'}}
    
    const groups = await db.group.findMany({
      where: whereGroups,
      include: {
        speciality: true
      },
      orderBy: {name: "asc"},
      skip: (page - 1) * size,
      take: size
    })
  
    const count = await db.group.count({
      where: whereGroups
    })

    const pages = Math.ceil(Number(count) / size)

  return (
    <HydrateClient>
      <main>
        <table>
          <tbody>
            <tr>
              <td className = "align-top pl-6 pb-6">
                <h2 className = "ml-2 mb-4 font-bold">Группы</h2>
                <SearchInput placeholder = "Найти группу..." />
                <GroupTable groups={groups} mode={role} page = {page} />
                <Pagination totalPages={pages} />
              </td>
              <td className = "align-top pt-8 px-4">
                {role == "ADMIN" && <AddGroup />}
              </td>
            </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  )
}
