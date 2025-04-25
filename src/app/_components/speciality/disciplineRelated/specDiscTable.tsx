import React from "react"
import {MinusIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { db } from "~/server/db"
import { deleteSpecDisc } from "~/app/api/action/speciality"
import Link from "next/link"


export default async function SpecDiscTable({ specialityId, role }:
    {specialityId: string, role: string }
) {
  const tdStyle = "px-2 border border-black border-solid"
  const edit = role === "ADMIN"
  
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
          <th className={tdStyle}>Название</th>
          <th className={tdStyle}>План</th>
          { edit && <th></th>}
        </tr>
      </thead>
      <tbody>
        {disciplines.map((d, i) => (
          <tr key={d.id}>
            <td className={tdStyle}><p>{i+1}</p></td>
            <td className={tdStyle}>{d.discipline.name}</td>
              <td className={tdStyle}>
                <Link href={`/academicplan/${d.id}`}>
                  <ClipboardDocumentListIcon className="w-5 ml-2" />
                </Link>
              </td>

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
