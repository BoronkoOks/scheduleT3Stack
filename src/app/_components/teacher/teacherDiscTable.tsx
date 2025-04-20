import React, { Suspense } from "react";
import { ArrowLongDownIcon, MinusIcon } from "@heroicons/react/24/outline"
import {db} from "~/server/db"
import { deleteTeacherDisc } from "~/app/api/action/teacher";


export default async function TeacherDiscTable ({ teacherId, mode, query }:
    {teacherId: string, mode: string, query: string }
  ) {
  return (
    <div className = "border-2 border-gray-500 rounded-lg">
      <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title">
        <div className = "flex">
          <h2 className=" ml-2"><b>Дисциплины преподавателя</b></h2>
          <ArrowLongDownIcon className = "w-6" />
        </div>
      </summary>
        <Suspense fallback={<div>Загрузка...</div>}>
          <DiscTable teacherId = {teacherId} mode = {mode} />
        </Suspense>
      </details>
    </div>
  )
}


async function DiscTable({ teacherId, mode }:
    {teacherId: string, mode: string }
) {
  const tdStyle = "px-2 border border-black border-solid"
  const edit = mode === "ADMIN"
  
  const disciplines = await db.teacherDiscipline.findMany({
    where: { teacherId: teacherId },
    include: {
      discipline: true
      },
      orderBy: {discipline: {name: "asc"}},
    }) ?? []

  if (!disciplines) {
      return (
          <div>Что-то пошло не так</div>
      )
  }

  return (
    <table className="box-border mx-4 mb-4 border-collapse border-1 border-black">
      <thead>
        <tr>
          <th className={tdStyle}>№</th>
          <th className={tdStyle + "whitespace-nowrap"}>Название</th>
          <th className={tdStyle}>Лекции</th>
          <th className={tdStyle}>Подгруппа</th>
          {edit && <th></th>}
        </tr>
      </thead>
      <tbody>
        {disciplines.map((d, i) => (
          <tr key={d.id}>
            <td className={tdStyle}><p>{i+1}</p></td>
            <td className={tdStyle}>{d.discipline.name}</td>
            <td className={tdStyle}>{d.lectures ? "+" : "-"}</td>
            <td className={tdStyle}>{d.subgroup ? d.subgroup : "все"}</td>

            {edit && 
            <td>
            <form action = {deleteTeacherDisc} className="form-control">
                <div className="flex max-w-xs flex-col space-y-2">
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={d.id}
                  />
                  <input
                    type="hidden"
                    name="id_teacher"
                    defaultValue={teacherId}
                  />
                  <button type="submit">
                    <MinusIcon className="w-6 mr-2 ml-2" />
                  </button>
                </div>
              </form>
            </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}
