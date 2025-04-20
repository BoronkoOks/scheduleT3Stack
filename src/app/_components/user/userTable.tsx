import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import Link from "next/link";

export default function UserTable({ users, page }: { users: User[], page?: number }) {
  const startNumber = ((page ?? 1) - 1) * 10 + 1

  const tdStyle = "px-2 border border-black border-solid"
  
  return (
    <div>
      <table className = "box-border my-4 border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle}>Email</th>
            <th className={tdStyle}>Роль</th>
            <th className={tdStyle}>Преподаватель</th>
            <th className={tdStyle}>Email подтверждён</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className={tdStyle + " align-items-end"}><p>{startNumber + i}</p></td>
              <td className={tdStyle}>{u.email}</td>
              <td className={tdStyle}>{u.role}</td>
              <td className={tdStyle}>{u?.teacher != null ? u?.teacher.surname + " " + u?.teacher.name.substring(0,1) + ". " + u?.teacher.fathername.substring(0,1) + "." : ""}</td>
              <td className={tdStyle}>{u.emailVerified?.toLocaleString() || ""}</td>
              <td className={tdStyle + " border-none"}>
                <Link href={`/user/${u.id}`}>
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
