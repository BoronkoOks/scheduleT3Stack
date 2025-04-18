import React, { Suspense } from "react"
import { db } from "~/server/db"
import TeacherDiscTable from "~/app/_components/teacher/teacherDisciplineTable"
import { TeacherInfo, TeacherInfoMODE } from "~/app/_components/teacher/teacherInfo"
import { auth } from "~/server/auth/index"
import {TeacherDiscipline} from "@prisma/client"
import {api} from "../../../trpc/react"


export default async function Page(props:
  { params: Promise<{ id: string }>,
    searchParams: Promise<{ query?: string }> }
) {
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

  const teacherDiscipline = await db.teacherDiscipline.findMany({
    where: { teacherId: params.id },
    include: {discipline: true}
  })

  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"
  // const role = session?.user?.role ?? "GUEST"

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
                <h2 className=" ml-4">Дисциплины преподавателя</h2>
                <Suspense fallback={<div>Loading...</div>}>
                  <TeacherDiscTable teacherId = {params.id} mode = {role} query = {query} />
                </Suspense>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  );
}