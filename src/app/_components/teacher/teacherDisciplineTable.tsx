"use client"

import React from "react";
import { PencilSquareIcon, MinusIcon } from "@heroicons/react/24/outline";
import type { Teacher, Discipline, TeacherDiscipline } from "@prisma/client";
import Link from "next/link"
import {db} from "~/server/db"
import { deleteTeacherDiscipline } from "~/app/api/action/teacher"
import DisciplineSearch from "~/app/ui/disciplineSearch"
import {PlusIcon} from "@heroicons/react/16/solid"
import {api} from "../../../trpc/react"


export default function TeacherDiscTable({ teacherId, mode, query }:
  {teacherId: string, mode: string, query: string }) {
  const tdStyle = "px-2 border border-black border-solid"

  const edit = mode === "ADMIN"
  
  // const teacherDisc = await db.teacher.findUnique({
  //   where: { id: teacherId },
  //   include: {
  //     teacherDisc: {
  //           include: {
  //             discipline: true,
  //           },
  //       },
  //   }})

    // if (!teacherDisc) {
    //     return (
    //         <div>Что-то пошло не так</div>
    //     )
    // }
    
    // const disciplines = teacherDisc.teacherDisc ?? []

    const disciplines = api.teacherDiscipline.getByTeacherId.useQuery({teacherId: teacherId}).data ?? []

    // const lecturesRef = React.useRef<HTMLInputElement[]>([])

    // const disciplines = []

  return (
    <div>
    {disciplines}
      {/* <table className="box-border m-4 border-collapse border-1 border-black">
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
              <td className={tdStyle + " text-center"}>{d?.lectures? "+": "-"}</td>
              <td className={tdStyle + " text-center"}>{d?.subgroups ?? "все"}</td>

            {edit && 
              <td>
              <form action={deleteTeacherDiscipline} className="form-control">
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
      </table> */}

      {/* {edit &&
        <details className = "collapse" tabIndex={0}>
          <summary className = "collapse-title text-xl font-medium">
            <PlusIcon className = "w-6" />
          </summary>
          <div className = "collapse-content">
            <DisciplineSearch query = {query} id_teacher = {teacherId} />
          </div>
          
        </details>
      } */}
    </div>
  )
}

