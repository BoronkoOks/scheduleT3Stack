import React, { Suspense } from "react"
import { db } from "~/server/db"
import DiscTeacherTable from "~/app/_components/discipline/disciplineTeacherTable"
import { DisciplineInfoMODE, DisciplineInfo } from "~/app/_components/discipline/disciplineInfo"
import { getRole } from "~/app/api/auth/check"


export default async function Page(props: { params: Promise<{ id: string }> }
) {
  const role = (await getRole())
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

  return (
    <main>
    <table>
      <tbody>
        <tr>
          <td className = "align-top pl-8 pb-6">
            <h2 className = "mb-4 font-bold">Информация о дисциплине</h2>
                  
            {role === "ADMIN" ?
            <DisciplineInfoMODE discipline = {discipline} />
            :
            <DisciplineInfo discipline = {discipline} />
            }
          </td>
          <td className = "align-top pl-10 pt-8">
            <div>
              <h2 className=" ml-4"><b>Преподаватели дисциплины</b></h2>
              <Suspense fallback={<div>Loading...</div>}>
                <DiscTeacherTable disciplineId = {discipline.id} mode = {role} />
              </Suspense>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  )
}