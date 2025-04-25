import React, { Suspense } from "react"
import { db } from "~/server/db"
import {SpecialityInfo, SpecialityInfoMODE} from "~/app/_components/speciality/specialityInfo"
import { getRole } from "~/app/api/auth/check"
import SpecDiscDropdown from "~/app/_components/speciality/disciplineRelated/specDiscDropdown"
import AddSpecDiscDropdown from "~/app/_components/speciality/disciplineRelated/addSpecDiscDropdown"

export default async function Page (props:
  { params: Promise<{ id: string }>, searchParams: Promise<{ query?: string;}>
}) {
  const role = (await getRole())
  const params = await props.params
  
  const searchParams = await props.searchParams
  const query = searchParams.query || ""

  const speciality = await db.speciality.findUnique(
      { where: { id: params.id } }
  )

  if (!speciality) {
      return (
          <main><h1>Специальность не найдена</h1></main>
      )
  }

  return (
    <main>
    <table>
      <tbody>
        <tr>
          <td className = "align-top pl-8 pb-6">
            <h2 className = "mb-4 font-bold">Информация о специальности</h2>
                  
            {role === "ADMIN" ?
            <SpecialityInfoMODE speciality = {speciality} />
            :
            <SpecialityInfo speciality = {speciality} />
            }
          </td>
          <td className = "align-top pl-10 pt-8">
            <SpecDiscDropdown specialityId = {params.id} role = {role} />
            {role == "ADMIN" && 
            <div className="mt-4">
              <AddSpecDiscDropdown query = {query} specialityId = {params.id} /> 
            </div>
            }
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  )
}