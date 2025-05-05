"use client"

import React, {useState} from "react"
import type { Schedule } from "@prisma/client"
import ScheduleCell from "./scheduleCell"


export default function ScheduleForDay({schedule, forWho, day, lesson}:
    {schedule: Schedule[], forWho: string, day: number, lesson: number}
){
    const tdStyle = "border border-black border-solid"
    const selectedLessonFree = tdStyle + " bg-green-400"
    const selectedLessonExists = tdStyle + " bg-red-300"

    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const lessons = [1, 2, 3, 4, 5]

    const [selectedCell, setSelectedCell] = useState<{tr: number, td: number, item: number} | null>(null)

    function handleCellSelect (tr: number, td: number, item: number) {
        // setSelectedCell({tr: tr, td: td, item: item})
    }

    return (
        <div>
            <h2 className=" ml-2 mb-4"><b>Расписание преподавателя</b></h2>
            <table className="text-xs ">
                <thead>
                    <tr>
                        <th></th>
                        <th className = {tdStyle}>{days[day-1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(l => 
                        <tr key = {l}>
                            <td className={tdStyle + " px-1"} key = {l}><b>{l}-я</b></td>

                            <td className = {l == lesson ? (schedule.filter(s => (s.lesson == l)).length > 0 ? selectedLessonExists : selectedLessonFree) : tdStyle + " text-center"} key = "lesson">
                                <ScheduleCell forWho = {forWho} edit = {false} selectedCell={selectedCell}
                                    handleCellSelect={handleCellSelect} tr = {l} td = {1}
                                    lessons = {schedule.filter(s => (s.lesson == l))}
                                    evenWeek = {false}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}