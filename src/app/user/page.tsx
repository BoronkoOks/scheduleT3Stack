import { db } from "~/server/db"
import { HydrateClient } from "~/trpc/server"
import Pagination from "../ui/pagination"
import SearchInput from "~/app/ui/searchInput"
import React from "react"
import { getRole } from "~/app/api/auth/check"
import UserTable from "../_components/user/userTable"
import { AddUser } from "~/app/_components/user/addUser"
import { metadata } from "../layout"


export default async function Home(props: {searchParams: Promise<{ query?: string; page?: string }>}) {
  const role = (await getRole())

  if (role !== "ADMIN") {
    return (
      <div className="m-4">
      <h1 className = "mb-4 font-bold">403 forbidden</h1>
        Вам тут делать нечего.
      </div>
    )
  }

  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const page = Number(searchParams?.page) || 1
  const size = 10

  metadata.title = "Пользователи"

  const whereUsers = { email: {startsWith: query, mode: 'insensitive'}}

  const users = await db.user.findMany({
    where: whereUsers,
    include: {
      teacher: true
    },
    orderBy: {email: "asc"},
    skip: (page - 1) * size,
    take: size
  })

  const count = await db.user.count({
    where: whereUsers
  })

  
  const pages = Math.ceil(Number(count) / size)

  return (
    <HydrateClient>
      <main className = "bg-gray-100">
        <table>
          <tbody>
          <tr>
            <td className = "align-top pl-6 pb-6">
              <h2 className = "ml-2 mb-4 font-bold">Пользователи</h2>
              <SearchInput placeholder = "Найти пользователя..." />
              <UserTable users = {users} page = {page} />
              <Pagination totalPages={pages} />
            </td>
            <td className = "align-top pt-8 pl-6">
            <AddUser />
            </td>
          </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  )
}
