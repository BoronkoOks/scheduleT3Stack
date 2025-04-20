import React, { Suspense } from "react"
import { db } from "~/server/db"
import { getRole } from "~/app/api/auth/check"
import { UserInfo, UserInfoMODE } from "~/app/_components/user/userInfo"

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const role = (await getRole())
    const params = await props.params

    const user = await db.user.findUnique(
        {
            where: { id: params.id },
            include: {
                teacher: true
            }
        }
    )

    if (!user) {
        return (
            <main><h1>Пользователь не найден</h1></main>
        )
    }

    return (
        <main>
            <table>
            <tbody>
                <tr>
                    <td className = "align-top pl-8 pb-6">
                    <h2 className = "mb-4 font-bold">Информация о пользователе</h2>
                    {role === "ADMIN" ?
                    <UserInfoMODE user = {user} />
                    : 
                    <UserInfo user = {user} />
                    }
                    </td>
                </tr>
            </tbody>
            </table>
        </main>
    )
}
