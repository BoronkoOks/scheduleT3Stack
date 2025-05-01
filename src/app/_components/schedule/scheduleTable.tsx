import React from "react"
import type { Schedule } from "@prisma/client"
import {tdStyle} from "~/styles/daisystyles"


export default async function ScheduleTable ({schedule, forWho}: {schedule: Schedule[], forWho: string}) {
    const days = [1, 2, 3, 4, 5, 6]
    const lessons = [1, 2, 3, 4, 5]

    return (
        <>
        <table className="text-xs">
            <thead>
                <tr>
                    <th></th>
                    <th className={tdStyle}>Понедельник</th>
                    <th className={tdStyle}>Вторник</th>
                    <th className={tdStyle}>Среда</th>
                    <th className={tdStyle}>Четверг</th>
                    <th className={tdStyle}>Пятница</th>
                    <th className={tdStyle}>Суббота</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map(l => 
                    <tr key = {l}>
                        <td className={tdStyle} key = {l}>{l}-я</td>
                        {days.map(d =>
                            <td className={tdStyle} key = {d}>
                                <ScheduleCell forWho = {forWho}
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


function ScheduleCell ({lessons, forWho} : {lessons: Schedule[], forWho: string}) {

    if (lessons.length == 0) {
        return (<>-</>)
    }

    if (forWho == "group") {
        return (
            <>
                {lessons.map(l => 
                    <div key = {l.id}>
                        <p>{l.lessontype}. {l.discipline.name}</p>
                        <p>{l.teacher.surname + " " + l.teacher.name.substring(0,1) + ". " + l.teacher.fathername.substring(0,1) + "."} a. {l.classroom.name} {l.subgroup && <>{l.subgroup} пг</>}</p>
                    </div>
                )}
            </>
        )
    }

    if (forWho == "teacher") {
        const lessontype = lessons[0]?.lessontype
        let group = lessons[0]?.group.name
        let subgroup

        if (lessontype == "лек") {
            for (let i = 1; i < lessons.length; i++) {
                group = group + ", " + lessons[i]?.group.name
            }

            subgroup = ""
        }
        else {
            subgroup = lessons[0]?.subgroup? lessons[0]?.subgroup + " пг" : ""
        }

        return (
            <>
                <p>{lessons[0]?.discipline.name}</p>
                <p>{group} {subgroup} а. {lessons[0]?.classroom.name}</p>
            </>
        )
    }


    if (forWho == "classroom") {
        const lessontype = lessons[0]?.lessontype
        let group = lessons[0]?.group.name
        let subgroup

        if (lessontype == "лек") {
            for (let i = 1; i < lessons.length; i++) {
                group = group + ", " + lessons[i]?.group.name
            }

            subgroup = ""
        }
        else {
            subgroup = lessons[0]?.subgroup? lessons[0]?.subgroup + " пг" : ""
        }

        return (
            <>
                <p>{lessons[0]?.discipline.name}</p>
                <p>{lessons[0]?.teacher.surname + " " + lessons[0]?.teacher.name.substring(0,1) + ". " + lessons[0]?.teacher.fathername.substring(0,1) + "."}; {group} {subgroup}</p>
            </>
        )
    }
    
    return (
        <>???</>
    )
}

