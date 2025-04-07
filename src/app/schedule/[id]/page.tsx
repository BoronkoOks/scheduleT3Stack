import React, { Suspense } from "react";
import { db } from "~/server/db";
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"
import { AddSchedule } from "~/app/_components/schedule/addSchedule";

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params

    if (params.id == "new"){
        return (
        <main>
            <h2 className = {pageHeaderStyle}>Добавление занятия</h2>
            <AddSchedule />
        </main>
        )
    }

    // const schedule = await db.schedule.findUnique(
    //     {
    //         where: { id: params.id },
    //         // include: {
    //         //     speciality: true
    //         // }
    //     }
    // )
    // const schedule = null

    // if (!schedule) {
    //     return (
    //         <main><h1>Занятие не найдено</h1></main>
    //     )
    // }

    const pageTitle = "Информация о занятии"

    const session = await auth()

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            <AddSchedule />
            {/* {session?.user?.role === "ADMIN" ?
                <GroupInfoMODE group = {group}/>
                : 
                <GroupInfo group = {group} />
            } */}
        </main>
    )
}
