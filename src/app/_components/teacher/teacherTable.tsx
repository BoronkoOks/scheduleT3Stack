import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Teacher } from "@prisma/client";
import Link from "next/link";

export default function TeacherTable({ teachers, page }: { teachers: Teacher[], page?: number }) {
  const startNumber = ((page ?? 1) - 1) * 10

  const tdStyle = "px-2 border border-black border-solid"
  
  return (
    <div>
      <table className = "box-border my-4 border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle}>Фамилия</th>
            <th className={tdStyle}>Имя</th>
            <th className={tdStyle}>Отчество</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, i) => (
            <tr key={t.id}>
              <td className={tdStyle + " align-items-end"}><p>{startNumber + i + 1}</p></td>
              <td className={tdStyle}>{t.surname}</td>
              <td className={tdStyle}>{t.name}</td>
              <td className={tdStyle}>{t?.fathername ?? ""}</td>
              <td className={tdStyle + " border-none"}>
              <Link href={`/teacher/${t.id}`}>
                  <PencilSquareIcon className="w-4" />
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
