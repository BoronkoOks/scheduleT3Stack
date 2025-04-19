import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Classroom } from "@prisma/client"
import Link from "next/link"


export default function ClassroomTable ({classrooms, mode, page} :
    {classrooms: Classroom[], mode: string, page: number}
) {
    const edit = mode === "ADMIN"
    const startNumber = ((page ?? 1) - 1) * 10 + 1
  
    const tdStyle = "px-2 border border-black border-solid"

    return (
        <div>
            <table className="box-border my-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Мест</th>
                    <th className={tdStyle}>Компьютеров</th>
                    <th className={tdStyle}>Проектор</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {classrooms.map((c, i) => (
                <tr key={c.id}>
                    <td className={tdStyle + " align-items-end"}><p>{startNumber + i}</p></td>
                    <td className={tdStyle}>{c.name}</td>
                    <td className={tdStyle}>{c.seats}</td>
                    <td className={tdStyle}>{c.computers}</td>
                    <td className={tdStyle}>{c.projector? "есть" : "-"}</td>
                    <td className={tdStyle + " border-none"}>
                        <Link href={`/classroom/${c.id}`}>
                        {edit ?
                            <PencilSquareIcon className="w-4" />
                            :
                            "<-"
                        }
                        </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
