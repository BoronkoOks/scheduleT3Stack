import { $Enums } from "@prisma/client"
import { auth } from "~/server/auth"
import { db } from "~/server/db";

export async function getRole() {
    const role = (await auth())?.user.role ?? "GUEST"

    return role.toString()
}

export async function isAdmin() {
    const session = await auth()

    if (!session) {
        return false
    }

    if (session.user.role !== $Enums.Role.ADMIN)
        return false
    return true
}


export async function isAdminOrCurrentUser(teacherId: string) {
    const session = await auth()

    if (!session){
        return false
    }

    if (session.user.role !== $Enums.Role.ADMIN){
        const teacher = await db.teacher.findFirst({
            where: {
                userId: session.user.id
            }
        })

        if (!teacher || teacher.id != teacherId) {
            return false
        }
    }
    
    return true
}