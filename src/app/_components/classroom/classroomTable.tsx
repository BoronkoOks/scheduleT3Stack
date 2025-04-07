import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Classroom } from "@prisma/client"
import Link from "next/link"
import {tdStyle} from "~/styles/daisystyles"


export default function ClassroomTable ({classrooms, mode} : {classrooms: Classroom[], mode: string}) {
    const edit = mode === "ADMIN"

    return (
        <div>
            <table className="box-border m-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Мест</th>
                    <th className={tdStyle}>Компьютеров</th>
                    <th className={tdStyle}>Проектор</th>
                    {edit && <th></th>}
                </tr>
            </thead>
            <tbody>
                {classrooms.map((c, i) => (
                <tr key={c.id}>
                    <td className={tdStyle + " align-items-end"}><p>{i+1}</p></td>
                    <td className={tdStyle}>{c.name}</td>
                    <td className={tdStyle}>{c.seats}</td>
                    <td className={tdStyle}>{c.computers}</td>
                    <td className={tdStyle}>{c.projector? "есть" : "-"}</td>

                    {edit && <td className={tdStyle + " border-none"}>
                                <Link href={`/classroom/${c.id}`}>
                                    <PencilSquareIcon className="w-4" />
                                </Link>
                            </td> }
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
