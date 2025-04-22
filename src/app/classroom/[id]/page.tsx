import React from "react"
import { db } from "~/server/db"
import {ClassroomInfoMODE, ClassroomInfo} from "~/app/_components/classroom/classroomInfo"
import { getRole } from "~/app/api/auth/check";

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const role = (await getRole())
    const params = await props.params

    const classroom = await db.classroom.findUnique(
        { where: { id: params.id } }
    )

    if (!classroom) {
        return (
            <main><h1>Кабинет не найден</h1></main>
        )
    }

    return (
        <main>
            <table>
            <tbody>
                <tr>
                    <td className = "align-top pl-8 pb-6">
                    <h2 className = "mb-4 font-bold">Информация о кабинете</h2>
                            
                    {role === "ADMIN" ?
                        <ClassroomInfoMODE classroom = {classroom}/>
                        : 
                        <ClassroomInfo classroom = {classroom} />
                    }
                    </td>
                </tr>
            </tbody>
            </table>
        </main>
    )
}