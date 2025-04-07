import Link from "next/link"
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { db } from "~/server/db"
import GroupTable from "~/app/_components/group/groupTable"
import { AddGroup } from "../_components/group/addGroup";


export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "GUEST"

  const groups = await db.group.findMany({
    include: {
      speciality: true
    }
  })

  return (
    <HydrateClient>
      <main>
        {role}
        <h2 className = {pageHeaderStyle}>Группы</h2>
        <div className = "inline-flex">
          <GroupTable groups={groups} mode={role} />
          <AddGroup />
        </div>
      </main>
    </HydrateClient>
  )
}
