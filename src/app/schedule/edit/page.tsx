import React, { Suspense } from "react"
import { db } from "~/server/db"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { AddSchedule } from "~/app/_components/schedule/addSchedule"
import { Schedule } from "@prisma/client"
import ScheduleDropdown from "~/app/_components/schedule/scheduleDropdown"
import { getRole, isAdmin, isAdminOrCurrentUser } from "~/app/api/auth/check"

export default async function Page (props: {searchParams: Promise<{searchBy?: string, id?: string }>}) {
    const params = await props.searchParams
    const searchBy = params.searchBy || "group"
    const id = params.id || ""

    let allowed = false
    
    if (searchBy == "group" || searchBy == "classroom") {
        allowed = await isAdmin()
    }
    
    if (searchBy == "teacher") {
        allowed = await isAdminOrCurrentUser(id)
    }

    if (!allowed) {
        return (
            <div className="m-4">
                <h1 className = "mb-4 font-bold">403 forbidden</h1>
            </div>
        )
    }

    let lessons: Schedule[] = []
    let pageTitle = "Расписание"

    if (searchBy == "group") {
        const group = await db.group.findFirst({
            where: {id: id}
        })

        pageTitle = "Расписание группы " + group?.name

        lessons = await db.schedule.findMany({
            where: {
              groupId: id
            },
            include: {
              discipline: true,
              teacher: true,
              classroom: true
            }
        })
    }

    if (params.searchBy == "teacher") {
        const teacher = await db.teacher.findFirst({
            where: { id: id }
        })

        pageTitle = "Расписание преподавателя: " + teacher?.surname + " " + teacher?.name + " " + teacher?.fathername

        lessons = await db.schedule.findMany({
            where: {
              teacherId: id
            },
            include: {
              discipline: true,
              group: true,
              classroom: true
            }
        })
    }

    if (params.searchBy == "classroom") {
        const classroom = await db.classroom.findFirst({
            where: {id: id}
        })

        pageTitle = "Расписание кабинета " + classroom?.name

        lessons = await db.schedule.findMany({
            where: {
                classroomID: id
            },
            include: {
              discipline: true,
              teacher: true,
              group: true
            }
        })
    }

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            <div className = "mt-4 mb-6 ml-2 mr-2">
                <div className="mb-2">
                    <ScheduleDropdown summary = "Нечётная неделя" edit = {true}
                        schedule = {lessons.filter(l => l.evenWeek == false)} forWho = {searchBy} />
                </div>
                <div>
                    <ScheduleDropdown summary = "Чётная неделя" edit = {true}
                        schedule = {lessons.filter(l => l.evenWeek == true)} forWho = {searchBy} />
                </div>
            </div>
        </main>
    )
}
