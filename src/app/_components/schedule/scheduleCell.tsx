import React from "react"
import type { Schedule } from "@prisma/client"
import { MinusIcon } from "@heroicons/react/24/outline"
import { deleteSchedule } from "~/app/api/action/schedule"

export default function ScheduleCell ({lessons, forWho, edit = false, tr, td, handleCellSelect, selectedCell}:
    {
        lessons: Schedule[],
        forWho: string,
        edit: boolean,
        tr: number,
        td: number,
        handleCellSelect: (tr: number, td: number, item: number) => void,
        selectedCell: {tr: number, td: number, item: number} | null
    }
) {
    const itemSelectedStyle = "bg-green-300"
    const deleteButtonStyle = "bg-red-400 border-2 rounded-md border-red-500 hover:text-gray-50 hover:bg-red-700"

    if (lessons.length == 0) {
        return (
            <div onClick={() => handleCellSelect(tr, td, 0)}
                className = {tr == selectedCell?.tr && td == selectedCell?.td ? itemSelectedStyle + " flex p-1 justify-center h-full": "flex p-1 justify-center h-full"}
            >
                -
            </div>
        )
    }

    async function handleDeleteGroupLesson(id: string) {
        await deleteSchedule(id)
    }

    if (forWho == "group") {
        return (
            <table className="w-full">
                <tbody>
                {lessons.map((l, i) => 
                    <tr key = {l.id} onClick={() => handleCellSelect(tr, td, i)}
                        className={tr == selectedCell?.tr && td == selectedCell?.td && i == selectedCell?.item ? itemSelectedStyle: ""}
                    >
                        <td className="p-1">
                            <p>{l.lessontype}. {l.discipline.name}</p>
                            <p>{l.teacher.surname + " " + l.teacher.name.substring(0,1) + ". " + l.teacher.fathername.substring(0,1) + "."} a. {l.classroom.name} {l.subgroup && <>{l.subgroup} пг</>}</p>
                        </td>
                        {edit && 
                        <td className="align-middle pt-2 px-1">
                            <button onClick={() => handleDeleteGroupLesson(l.id)} className = {deleteButtonStyle}>
                                <MinusIcon className="w-4"/>
                            </button>
                        </td>
                        }
                    </tr>
                )}
                </tbody>
            </table>
        )
    }



    async function handleDeleteTeacherLessons() {
        for (let i = 0; i < lessons.length; i++) {
            if (lessons[i]?.id) {
                await deleteSchedule(lessons[i]?.id || "")
            }
        }
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
            <div onClick={() => handleCellSelect(tr, td, 0)}
                className = {tr == selectedCell?.tr && td == selectedCell?.td ? itemSelectedStyle + " flex": "flex"}
            >
                <div className="p-1">
                    <p>{lessons[0]?.lessontype}. {lessons[0]?.discipline.name}</p>
                    <p>{group} {subgroup} а. {lessons[0]?.classroom.name}</p>
                </div>

                {edit &&
                <div className = "pt-2 px-1">
                    <button onClick={() => handleDeleteTeacherLessons()} className = {deleteButtonStyle}>
                        <MinusIcon className="w-4"/>
                    </button>
                </div>
                }
            </div>
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
            <div onClick={() => handleCellSelect(tr, td, 0)}
                className = {tr == selectedCell?.tr && td == selectedCell?.td ? itemSelectedStyle + " flex p-1": "flex p-1"}
            >
                <div className="p-1">
                    <p>{lessons[0]?.lessontype}. {lessons[0]?.discipline.name}</p>
                    <p>{lessons[0]?.teacher.surname + " " + lessons[0]?.teacher.name.substring(0,1) + ". " + lessons[0]?.teacher.fathername.substring(0,1) + "."}; {group} {subgroup}</p>
                </div>
                
                {edit &&
                <div className = "pt-2 px-1">
                    <button onClick={() => handleDeleteTeacherLessons()} className = {deleteButtonStyle}>
                        <MinusIcon className="w-4"/>
                    </button>
                </div>
                }
            </div>
        )
    }
    
    return (
        <div>???</div>
    )
}