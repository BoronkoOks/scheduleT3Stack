import { $Enums } from "@prisma/client"
import { auth } from "~/server/auth"

export async function getRole() {
    const role = (await auth())?.user.role ?? "GUEST"

    return role.toString()
}

export async function isAdmin() {
    const session = await auth();
    if (!session) return false;
    if (session.user.role !== $Enums.Role.ADMIN)
        return false
    return true
}

export async function isAdminOrCurrentTutor(squadTutorId: string) {
    const session = await auth();
    if (!session) return false;
    if (session.user.role !== $Enums.Role.ADMIN)
        if (session.user.id !== squadTutorId)
            return false
    return true
}