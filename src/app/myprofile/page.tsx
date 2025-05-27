import React, { Suspense } from "react"
import { db } from "~/server/db"
import { auth } from "~/server/auth"
import { ProfileInfoMODE } from "../_components/myprofile/profileInfo"

export default async function Page () {
    const userId = (await auth())?.user.id

    if (!userId) {
        return (
            <main><div className="m-4"><h1 className = "mb-4 font-bold">401 Unauthorized</h1></div></main>
        )
    }

    const user = await db.user.findUnique(
        {
            where: { id: userId },
            include: {
                teacher: true
            }
        }
    )

    return (
        <main>
            <table>
            <tbody>
                <tr>
                    <td className = "align-top pl-8 pb-6">
                        <h2 className = "mb-4 font-bold">Профиль</h2>
                        <ProfileInfoMODE user = {user} />
                    </td>
                </tr>
            </tbody>
            </table>
        </main>
    )
}
