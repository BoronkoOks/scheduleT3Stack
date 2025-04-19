import React, { Suspense } from "react";
import { db } from "~/server/db";
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"
import { GroupInfo, GroupInfoMODE } from "~/app/_components/group/groupInfo";
import { getRole } from "~/app/api/auth/check";

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const role = (await getRole())
    const params = await props.params

    const group = await db.group.findUnique(
        {
            where: { id: params.id },
            include: {
                speciality: true
            }
        }
    )

    if (!group) {
        return (
            <main><h1>Группа не найдена</h1></main>
        )
    }

    const pageTitle = "Информация о группе"

    const session = await auth()

    return (
        <main>
            <table>
            <tbody>
                <tr>
                    <td className = "align-top pl-8 pb-6">
                    <h2 className = "mb-4 font-bold">Информация о группе</h2>
                            
                    {role === "ADMIN" ?
                    <GroupInfoMODE groupId = {params.id} />
                    : 
                    <GroupInfo group = {group} />
                    }
                    </td>
                </tr>
            </tbody>
            </table>
        </main>
    )
}