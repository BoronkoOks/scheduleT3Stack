import React from "react"
import { db } from "~/server/db"
import PlanTable from "~/app/_components/academicplan/planTable"
import { AddPlan } from "~/app/_components/academicplan/addPlan"
import { getRole } from "~/app/api/auth/check"

export default async function Page (props:
  { params: Promise<{ id: string }>
}) {
  const role = (await getRole())
  
  const params = await props.params

  const plan = await db.specialityDisc.findUnique(
    {
      where: { id: params.id },
      include: {
        speciality: true,
        discipline: true
      }
    }
  )

  if (!plan) {
    return (
      <main><h1>План не найден</h1></main>
    )
  }

  return (
    <main>
    <table>
      <tbody>
        <tr>
          <td className = "align-top pl-8 pb-6">
            <h2 className = "mb-2 font-bold">Учебный план</h2>
            <p><b>Специальность:</b> {plan.speciality.code} {plan.speciality.name}</p>
            <p><b>Дисциплина:</b> {plan.discipline.name}</p>
            <p>семестров: {plan.discipline.semesters}</p>
            <PlanTable specDiscId = {plan.id} role = {role}/>
          </td>
          <td className = "align-top pl-10 pt-8">
            {role == "ADMIN" && <AddPlan specDiscId = {plan.id} /> }
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  )
}