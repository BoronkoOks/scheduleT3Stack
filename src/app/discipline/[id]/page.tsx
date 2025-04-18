import Link from "next/link";
import React, { Suspense } from "react";
import { updateDiscipline, deleteDiscipline } from "~/app/api/action/discipline";
import { db } from "~/server/db";
import { metadata } from "~/app/layout"
import {divForm} from "~/styles/daisystyles"
import DiscTeacherTable from "~/app/_components/discipline/disciplineTeacherTable";
import { DisciplineInfoMODE, DisciplineInfo } from "~/app/_components/discipline/disciplineInfo"
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"



export default async function Page(props: { params: Promise<{ id: string }> }
) {
  const params = await props.params

  const discipline = await db.discipline.findUnique(
    {
      where: { id: params.id }
    }
  )

  if (!discipline) {
    return (
        <main><h1>Дисциплина не найдена</h1></main>
    )
  }

  const pageTitle = "Информация о дисциплине"
  const inputClassStyle = "input input-bordered"

  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  return (
    <main>
      <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
    <div className = " inline-flex">
      {role === "ADMIN" ?
      <DisciplineInfoMODE discipline = {discipline} />
      :
      <DisciplineInfo discipline = {discipline} />
      }
      <div className = " ml-4"
      >
        <h2 className=" ml-4"><b>Преподаватели дисциплины</b></h2>
        <Suspense fallback={<div>Loading...</div>}>
          <DiscTeacherTable disciplineId = {discipline.id} mode = {role} />
        </Suspense>
      </div>
    </div>
    </main>
  );
}