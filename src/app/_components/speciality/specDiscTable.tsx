import React, { Suspense } from "react";
import { ArrowLongDownIcon, MinusIcon } from "@heroicons/react/24/outline"
import {db} from "~/server/db"
import { deleteSpecDisc } from "~/app/api/action/speciality"
import AddSpecDisc from "./addSpecDisc";


export default async function SpecDiscTable ({specialityId, role}:
  {specialityId: string, role: string}
) {
  return (
    <div className = "border-2 border-gray-500 rounded-lg">
      <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title">
        <div className = "flex">
          <h2 className=" ml-2"><b>Дисциплины специальности</b></h2>
          <ArrowLongDownIcon className = "w-6" />
        </div>
      </summary>
        <Suspense fallback={<div>Загрузка...</div>}>
          <DiscTable specialityId = {specialityId} mode = {role} />
        </Suspense>
      </details>
    </div>
  )
}


async function DiscTable({ specialityId, mode }:
    {specialityId: string, mode: string }
) {
  const tdStyle = "px-2 border border-black border-solid"
  const edit = mode === "ADMIN"
  
  const disciplines = await db.specialityDisc.findMany({
    where: { specialityId: specialityId },
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
          {edit && <th></th>}
        </tr>
      </thead>
      <tbody>
        {disciplines.map((d, i) => (
          <tr key={d.id}>
            <td className={tdStyle}><p>{i+1}</p></td>
            <td className={tdStyle}>{d.discipline.name}</td>

            {edit && 
            <td>
            <form action = {deleteSpecDisc} className="form-control">
                <div className="flex max-w-xs flex-col space-y-2">
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={d.id}
                  />
                  <input
                    type="hidden"
                    name="id_speciality"
                    defaultValue={specialityId}
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
