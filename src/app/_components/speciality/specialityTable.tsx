import React from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { Speciality } from "@prisma/client"
import Link from "next/link"


export default function SpecialityTable ({specialities, mode, page} :
    {specialities: Speciality[], mode: string, page?: number }
) {
    const edit = mode === "ADMIN"
    const startNumber = ((page ?? 1) - 1) * 10
  
    const tdStyle = "px-2 border border-black border-solid"

    return (
        <div>
            <table className = "box-border my-4 border-collapse border-1 border-black">
            <thead>
                <tr>
                    <th className={tdStyle}>№</th>
                    <th className={tdStyle}>Название</th>
                    <th className={tdStyle}>Код</th>
                    <th className={tdStyle}>Лет обучения</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {specialities.map((s, i) => (
                <tr key={s.id}>
                    <td className={tdStyle + " align-items-end"}><p>{startNumber + i + 1}</p></td>
                    <td className={tdStyle}>{s.name}</td>
                    <td className={tdStyle}>{s.code}</td>
                    <td className={tdStyle}>{s.years}</td>
                    <td className = "px-2  border-none">
                        <Link href={`/speciality/${s.id}`}>
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
