import React from "react"
import { db } from "~/server/db"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { AddScheduleGroup } from "~/app/_components/schedule/addScheduleGroup"
import { getRole, isAdmin, isAdminOrCurrentUser } from "~/app/api/auth/check"
import { AddScheduleTeacher } from "~/app/_components/schedule/addScheduleTeacher"

export default async function Page (props: {searchParams: 
    Promise<{forWho?: string, id?: string; evenWeek?: string; day?: number; lesson?: number}>}
) {
    const params = await props.searchParams

    const forWho = params.forWho || "group"
    const id = params.id || ""
    const evenWeek = params.evenWeek == "true" ? true : false
    const day = params.day || 1
    const lesson = params.lesson || 1

    let allowed = false
    
    if (forWho == "group" || forWho == "classroom") {
        allowed = await isAdmin()
    }
    
    if (forWho == "teacher") {
        allowed = await isAdminOrCurrentUser(id)
    }

    if (!allowed) {
        return (
            <div className="m-4">
                <h1 className = "mb-4 font-bold">403 forbidden</h1>
            </div>
        )
    }

    let pageTitle = "Расписание"

    if (forWho == "group") {
        const group = await db.group.findFirst({
            where: {id: id}
        })

        pageTitle = "Занятие группы " + group?.name
    }

    if (params.forWho == "teacher") {
        const teacher = await db.teacher.findFirst({
            where: { id: id }
        })

        pageTitle = "Занятие преподавателя: " + teacher?.surname + " " + teacher?.name + " " + teacher?.fathername

    }

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            <div className = "mt-4 ml-2 mb-6 mr-2">
                {
                    forWho == "group" ?
                    <AddScheduleGroup groupId = {id} evenWeek = {evenWeek} day = {day} lesson = {lesson} />
                    :
                    <AddScheduleTeacher teacherId = {id} evenWeek = {evenWeek} day = {day} lesson = {lesson} />
                }
                </div>
        </main>
    )
}
