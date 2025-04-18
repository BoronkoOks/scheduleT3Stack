import React, { Suspense } from "react";
import { db } from "~/server/db";
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"
import { GroupInfo, GroupInfoMODE } from "~/app/_components/group/groupInfo";

export default async function Page (props: { params: Promise<{ id: string }> }) {
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
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            {session?.user?.role === "ADMIN" ?
                <GroupInfoMODE group = {group}/>
                : 
                <GroupInfo group = {group} />
            }
        </main>
    )
}