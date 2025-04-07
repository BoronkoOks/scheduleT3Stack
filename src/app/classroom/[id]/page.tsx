import Link from "next/link";
import React, { Suspense } from "react";
import { db } from "~/server/db";
import { metadata } from "~/app/layout"
import {ClassroomInfoMODE, ClassroomInfo} from "~/app/_components/classroom/classroomInfo"
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params

    const classroom = await db.classroom.findUnique(
        {
        where: { id: params.id }
        }
    )

    if (!classroom) {
        return (
            <main><h1>Кабинет не найден</h1></main>
        )
    }

    const pageTitle = "Информация о кабинете"

    const inputClassStyle = "input input-bordered"

    const session = await auth()

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            {session?.user?.role === "ADMIN" ?
            <ClassroomInfoMODE classroom = {classroom}/>
            : 
            <ClassroomInfo classroom = {classroom} />
            }
        </main>
    )
}