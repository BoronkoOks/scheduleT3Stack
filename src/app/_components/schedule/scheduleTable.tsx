"use client"

import React, {useState} from "react"
import type { Schedule } from "@prisma/client"
import ScheduleCell from "./scheduleCell"


export default function ScheduleTable ({schedule, forWho, edit = false}:
    {schedule: Schedule[], forWho: string, edit: boolean}
){
    const tdStyle = "border border-black border-solid"

    const days = [1, 2, 3, 4, 5, 6]
    const lessons = [1, 2, 3, 4, 5]

    const [selectedCell, setSelectedCell] = useState<{tr: number, td: number, item: number} | null>(null)

    function handleCellSelect (tr: number, td: number, item: number) {
        setSelectedCell({tr: tr, td: td, item: item})
    }

    return (
        <>
        {JSON.stringify(selectedCell)}
        <table className="text-xs ">
            <thead>
                <tr>
                    <th></th>
                    <th className={tdStyle + " px-1"}>Понедельник</th>
                    <th className={tdStyle + " px-1"}>Вторник</th>
                    <th className={tdStyle + " px-1"}>Среда</th>
                    <th className={tdStyle + " px-1"}>Четверг</th>
                    <th className={tdStyle + " px-1"}>Пятница</th>
                    <th className={tdStyle + " px-1"}>Суббота</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map(l => 
                    <tr key = {l}>
                        <td className={tdStyle + " px-1"} key = {l}><b>{l}-я</b></td>
                        {days.map(d =>
                            <td className = {tdStyle + " text-center"} key = {d}>
                                <ScheduleCell forWho = {forWho} edit = {edit} selectedCell={selectedCell}
                                    handleCellSelect={handleCellSelect} tr = {l} td = {d}
                                    lessons = {schedule.filter(s => (s.day == d && s.lesson == l))}/>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}

