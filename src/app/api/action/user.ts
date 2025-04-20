"use server"

import { Role } from "@prisma/client"
import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"


export async function createUser (formData: FormData) {
    const fd = z.object({
        email: z.string(),
        role: z.string(),
        teacherId: z.string()
    })
    .parse({
        email: formData.get("email"),
        role: formData.get("role"),
        teacherId: formData.get("teacherId")
    })

    if (fd.teacherId !== "") {
        fd.role = "TEACHER"

        console.log("\n\nteacher\n\n")
        console.log(JSON.stringify(fd))

        await db.user.create({
            data: {
                email: fd.email,
                role: fd.role as Role,
                teacher: {
                    connect: { id: fd.teacherId }
                }
            }
        })
    }
    else {
        await db.user.create({
            data: {
                email: fd.email,
                role: fd.role as Role
            }
        })
    }

    revalidatePath("/user")
}

export async function updateUser (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        email: z.string(),
        role: z.string(),
        teacherId_old: z.string(),
        teacherId: z.string()
    })
    .parse({
        id: formData.get("id"),
        email: formData.get("email"),
        role: formData.get("role"),
        teacherId_old: formData.get("teacherId_old"),
        teacherId: formData.get("teacherId")
    })

    // В новом варианте указан преподаватель
    if (fd.teacherId !== "") {
        fd.role = "TEACHER"

        await db.user.update({
            where: {
                id: fd.id
            },
            data: {
                email: fd.email,
                role: fd.role as Role,
                teacher: {
                    connect: { id: fd.teacherId }
                }
            }
        })
    }
    else { // В новом варианте преподаватель не указан
        if (fd.teacherId_old != "") { // Но раньше был
            await db.user.update({
                where: {
                    id: fd.id
                },
                data: {
                    email: fd.email,
                    role: fd.role as Role,
                    teacher: {
                        disconnect: {id: fd.teacherId_old}
                    }
                }
            })
        }
        else {
            await db.user.update({
                where: {
                    id: fd.id
                },
                data: {
                    email: fd.email,
                    role: fd.role as Role
                }
            })
        }
        
    }

    revalidatePath("/user")
    revalidatePath("/user/"+fd.id)
}



export async function deleteUser (formData: FormData) {
    const fd = z.object({
        id: z.string()
    })
    .parse({
        id: formData.get("id")
    })

    await db.user.delete({where: {id: fd.id}})

    redirect("/user")
}

