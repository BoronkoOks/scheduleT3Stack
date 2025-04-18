import Link from "next/link";
import React, { Suspense } from "react";
import { db } from "~/server/db";
import { metadata } from "~/app/layout"
import { auth } from "~/server/auth/index";
import {pageHeaderStyle} from "~/styles/daisystyles"
import {SpecialityInfo, SpecialityInfoMODE} from "~/app/_components/speciality/specialityInfo"

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params

    const speciality = await db.speciality.findUnique(
        {
        where: { id: params.id }
        }
    )

    if (!speciality) {
        return (
            <main><h1>Специальность не найдена</h1></main>
        )
    }

    const pageTitle = "Информация о специальности"

    const inputClassStyle = "input input-bordered"

    const session = await auth()

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            
            {session?.user?.role === "ADMIN" ?
            <SpecialityInfoMODE speciality = {speciality} />
            :
            <SpecialityInfo speciality = {speciality} />
            }
        </main>
    )
}