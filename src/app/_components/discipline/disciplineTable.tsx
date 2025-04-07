import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Discipline } from "@prisma/client";
import Link from "next/link";

export default function DisciplineTable({ disciplines, mode }: { disciplines: Discipline[], mode: string }) {
  const edit = mode === "ADMIN"

  const tdStyle = "px-2 border border-black border-solid"
  
  return (
    <div>
      <table className="box-border m-4 border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle + "whitespace-nowrap"}>Название</th>
            <th className={tdStyle}>Семестров</th>
            <th className={tdStyle}>Деление на подгруппы</th>
            {edit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {disciplines.map((d, i) => (
            <tr key={d.id}>
              <td className={tdStyle}><p>{i+1}</p></td>
              <td className={tdStyle + "whitespace-nowrap"}>{d.name}</td>
              <td className={tdStyle + " text-center"}>{d?.semesters ?? "все"}</td>
              <td className={tdStyle + " text-center"}>{d?.subgroups? "+" : "-"}</td>

              {edit &&
              <td className={tdStyle + " border-none"}>
                <Link href={`/discipline/${d.id}`}>
                    <PencilSquareIcon className="w-4" />
                </Link>
              </td>
              }

              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
