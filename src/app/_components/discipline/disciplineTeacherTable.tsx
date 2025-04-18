import React from "react";
import { PencilSquareIcon, MinusIcon } from "@heroicons/react/24/outline";
import type { Teacher, Discipline, TeacherDiscipline } from "@prisma/client";
import Link from "next/link"
import {db} from "~/server/db"

export default async function DiscTeacherTable({ disciplineId, mode }: {disciplineId: string, mode: string }) {
  const tdStyle = "px-2 border border-black border-solid"
  const edit = mode === "ADMIN"
  
  const discTeacher = await db.discipline.findUnique({
    where: { id: disciplineId },
    include: {
      discTeacher: {
            include: {
              teacher: true,
            },
        },
    }})


    if (!discTeacher) {
        return (
            <div>Что-то пошло не так</div>
        )
    }
    
  const disciplines = discTeacher.discTeacher ?? []


  return (
    <div>
      <table className="box-border m-4 border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle + "whitespace-nowrap"}>Преподаватель</th>
            <th className={tdStyle}>Лекции</th>
            <th className={tdStyle}>Подгруппа</th>
            {edit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {disciplines.map((d, i) => (
            <tr key={d.id}>
              <td className={tdStyle}><p>{i+1}</p></td>
              <td className={tdStyle}>{d.teacher.surname + " " + d.teacher.name + " " + d.teacher.fathername}</td>
              <td className={tdStyle + " text-center"}>{d?.lectures? "+": "-"}</td>
              <td className={tdStyle + " text-center"}>{d?.subgroups ?? "все"}</td>

              {edit && 
              <td>
              <form //action={deleteDisciplineTeacher}
              className="form-control">
                  <div className="flex max-w-xs flex-col space-y-2">
                    <input
                      type="hidden"
                      name="id"
                      defaultValue={d.id}
                    />
                    <input
                      type="hidden"
                      name="id_discipline"
                      defaultValue={disciplineId}
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
    </div>
  )
}
