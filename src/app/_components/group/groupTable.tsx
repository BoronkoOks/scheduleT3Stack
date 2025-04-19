import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Group } from "@prisma/client"
import Link from "next/link"


export default function GroupTable ({groups, mode, page} : 
    {groups: Group[], mode: string, page: number}
) {
    const edit = mode === "ADMIN"
    const startNumber = ((page ?? 1) - 1) * 10 + 1
  
    const tdStyle = "px-2 border border-black border-solid"

    const currentYear = Number(new Date().getFullYear())
    const correction = Number(new Date().getMonth()) > 7 ? 1 : 0

    return (
        <div>
            <table className="box-border my-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Студентов</th>
                    <th className={tdStyle}>Курс</th>
                    <th className={tdStyle}>Год поступления</th>
                    <th className={tdStyle}>Специальность</th>
                    {edit && <th></th>}
                </tr>
            </thead>
            <tbody>
                {groups.map((g, i) => (
                <tr key={g.id}>
                    <td className={tdStyle + " align-items-end"}><p>{startNumber + i}</p></td>
                    <td className={tdStyle}>{g.name}</td>
                    <td className={tdStyle}>{g.students}</td>
                    <td className={tdStyle}>{currentYear - g.year + correction}</td>
                    <td className={tdStyle}>{g.year}</td>
                    <td className={tdStyle}>{g.speciality.code + " " + g.speciality.name}</td>
                    <td className={tdStyle + " border-none"}>
                        <Link href={`/group/${g.id}`}>
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
