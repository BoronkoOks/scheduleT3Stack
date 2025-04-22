import React, { Suspense } from "react"
import { db } from "~/server/db"
import TeacherDiscDropdown from "~/app/_components/teacher/disciplinesRelated/teacherDiscDropdown"
import { TeacherInfo, TeacherInfoMODE } from "~/app/_components/teacher/teacherInfo"
import { getRole } from "~/app/api/auth/check"
import AddDiscDropdown from "~/app/_components/teacher/disciplinesRelated/addDiscDropdown"


export default async function Page(props:
  { params: Promise<{ id: string }>,
    searchParams: Promise<{ query?: string }> }
) {
  const role = (await getRole())
  
  const searchParams = await props.searchParams
  const query = searchParams.query || ""
  const params = await props.params

  const teacher = await db.teacher.findUnique(
    {
      where: { id: params.id }
    }
  )

  if (!teacher) {
    return (
        <main><h1>Преподаватель не найден</h1></main>
    )
  }
  
  return (
    <main>
    <table>
      <tbody>
        <tr>
          <td className = "align-top pl-6 pb-6">
            <h2 className = "ml-2 mb-4 font-bold">Информация о преподавателе</h2>
                  
            {role === "ADMIN" ?
            <TeacherInfoMODE teacher = {teacher} />
            :
            <TeacherInfo teacher = {teacher} />
            }
          </td>
          <td className = "align-top pl-10 pt-8">
            <div>
                <TeacherDiscDropdown teacherId = {params.id} mode = {role} />
                {role == "ADMIN" && 
                <div className="mt-4">
                  <AddDiscDropdown query = {query} teacherId = {params.id} /> 
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