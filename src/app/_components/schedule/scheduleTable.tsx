import React from "react"
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline"
import type { Schedule } from "@prisma/client"
import Link from "next/link"
import {tdStyle} from "~/styles/daisystyles"
import { db } from "~/server/db"


export default async function ScheduleTable ({schedule, mode}: {schedule: string, mode: string}) {
    const edit = mode === "ADMIN"

    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    const criteria = "gr1"

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th className={tdStyle}>Понедельник</th>
                    <th className={tdStyle}>Вторник</th>
                    <th className={tdStyle}>Среда</th>
                    <th className={tdStyle}>Четверг</th>
                    <th className={tdStyle}>Пятница</th>
                    <th className={tdStyle}>Суббота</th>
                    {edit && <th></th>}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={tdStyle}>1-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {false} day = {day} lesson = {1} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>2-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {false} day = {day} lesson = {2} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>3-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {false} day = {day} lesson = {3} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>4-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {false} day = {day} lesson = {4} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>5-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {false} day = {day} lesson = {5} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>1-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {true} day = {day} lesson = {1} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>2-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {true} day = {day} lesson = {2} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>3-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {true} day = {day} lesson = {3} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>4-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {true} day = {day} lesson = {4} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
                <tr>
                    <td className={tdStyle}>5-я</td>
                    {days.map(day =>
                        <td className={tdStyle}>
                            <ScheduleCell evenWeek = {true} day = {day} lesson = {5} criteria = "group"
                                condition = "gr1"
                            />
                        </td>
                        )}
                </tr>
            </tbody>
        </table>
    )
}


async function ScheduleCell ({evenWeek, day, lesson, criteria, condition}:
    {evenWeek: boolean, day: string, lesson: number, criteria: string, condition: string}
    ) {
    
    let lessons: null | Schedule = null

    const where_ = {
        AND: [
            {evenWeek: evenWeek},
            {day: day},
            {lesson: lesson},
            {groupId: condition}
        ]
    }

    lessons = await db.schedule.findMany({
            where: where_,
            include: {
                discipline: true
            }
        })

    // switch (criteria) {
    //     case "group": { lessons = await db.schedule.findMany({
    //         where: where_
    //     })}; break

    //     default: { lessons = await db.schedule.findMany({
    //         where: where_
    //     })}; break
    // }

    if (lessons.length == 0) {
        return (
            <Link href={`/schedule/new`}>
                    <PlusIcon className="w-4" />
            </Link>
        )
    }

    return (
        // <>{JSON.stringify(lessons)}
        <div className="flex">
           <label> Допустим, занятие</label>
            <Link href={`/schedule/${lessons[0].id}`}>
                <PencilSquareIcon className="w-4 mt-1 ml-1" />
            </Link>
        </div>
        // </>
    )
}

