import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Group } from "@prisma/client"
import Link from "next/link"
import {tdStyle} from "~/styles/daisystyles"


export default function GroupTable ({groups, mode} : {groups: Group[], mode: string}) {
    const edit = mode === "ADMIN"

    return (
        <div>
            <table className="box-border m-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Студентов</th>
                    <th className={tdStyle}>Год поступления</th>
                    <th className={tdStyle}>Специальность</th>
                    {edit && <th></th>}
                </tr>
            </thead>
            <tbody>
                {groups.map((g, i) => (
                <tr key={g.id}>
                    <td className={tdStyle + " align-items-end"}><p>{i+1}</p></td>
                    <td className={tdStyle}>{g.name}</td>
                    <td className={tdStyle}>{g.students}</td>
                    <td className={tdStyle}>{g.year}</td>
                    <td className={tdStyle}>{g.speciality.name}</td>

                    {edit && <td className={tdStyle + " border-none"}>
                                <Link href={`/group/${g.id}`}>
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
