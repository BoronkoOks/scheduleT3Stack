import React, { Suspense } from "react"
import { db } from "~/server/db"
import { DisciplineInfoMODE, DisciplineInfo } from "~/app/_components/discipline/disciplineInfo"
import { getRole } from "~/app/api/auth/check"
import AddTeacherDropdown from "~/app/_components/discipline/teachersRelated/addTeacherDropdown"
import DiscTeacherDropdown from "~/app/_components/discipline/teachersRelated/discTeacherDropdown"


export default async function Page(props:
  { params: Promise<{ id: string }>,
    searchParams: Promise<{ query?: string }> }
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams
  const query = searchParams.query || ""
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
              <DiscTeacherDropdown disciplineId = {params.id} role = {role} />

              {role == "ADMIN" &&
              <div className="mt-4">
                <AddTeacherDropdown disciplineId = {params.id} query= {query}/>
              </div>
              }
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  )
}