import Link from "next/link";
import React, { Suspense } from "react";
import { updateTeacher, deleteTeacher } from "~/app/api/action/teacher";
import { db } from "~/server/db";
import { metadata } from "~/app/layout"
import {pageHeaderStyle} from "~/styles/daisystyles"
import TeacherDiscTable from "~/app/_components/teacher/teacherDisciplineTable"
import { TeacherInfo, TeacherInfoMODE } from "~/app/_components/teacher/teacherInfo";
import { auth } from "~/server/auth/index";


export default async function Page(props: { params: Promise<{ id: string }>,
  searchParams: Promise<{ query?: string }> }
) {
  const searchParams = await props.searchParams;
    const query = searchParams.query || "";
    const params = await props.params;

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

  const pageTitle = "Информация о преподавателе"

  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"
  
  // metadata.title = pageTitle

  // const divForm = "flex max-w-xs flex-col space-y-2 mx-5 py-4 px-5 border-2 border-green-800 bg-white"
  const inputClassStyle = "input input-bordered"

  return (
    <main>
    {role}
    <table>
      <tbody>
      <tr>
        <td className = "align-top">
      <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            
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
              <TeacherDiscTable teacherId = {teacher.id} mode = {role} query = {query} />
            </Suspense>
        </div>
          </td>
        </tr>
        </tbody>
        </table>
    </main>
  );
}