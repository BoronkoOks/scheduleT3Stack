import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import DisciplineTable from "~/app/_components/discipline/disciplineTable"
import { db } from "~/server/db"
import { AddDiscipline } from "../_components/discipline/addDiscipline";
import { pageHeaderStyle } from "~/styles/daisystyles";


export default async function Home() {
  const disciplines = await db.discipline.findMany()
  
  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  return (
    <HydrateClient>
      <main>
        <h2 className = {pageHeaderStyle}>Дисциплины</h2>
      <div className = " inline-flex">
        <DisciplineTable disciplines = {disciplines} mode = {role} />
        {role === "ADMIN" && <AddDiscipline />}
      </div>
      </main>
    </HydrateClient>
  )
}
