import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Speciality } from "@prisma/client"
import Link from "next/link"
import {tdStyle} from "~/styles/daisystyles"


export default function SpecialityTable ({specialities, mode} : {specialities: Speciality[], mode: string}) {
    const edit = mode === "ADMIN"

    return (
        <div>
            <table className="box-border m-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Код</th>
                    <th className={tdStyle}>Лет обучения</th>
                    {edit && <th></th>}
                </tr>
            </thead>
            <tbody>
                {specialities.map((s, i) => (
                <tr key={s.id}>
                    <td className={tdStyle + " align-items-end"}><p>{i+1}</p></td>
                    <td className={tdStyle}>{s.name}</td>
                    <td className={tdStyle}>{s.code}</td>
                    <td className={tdStyle}>{s.years}</td>

                    {edit && <td className={tdStyle + " border-none"}>
                                <Link href={`/speciality/${s.id}`}>
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
