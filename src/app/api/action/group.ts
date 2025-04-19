"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"

export async function createGroup (formData: FormData) {
    const fd = z.object({
        name: z.string(),
        students: z.number(),
        year: z.number(),
        specialityId: z.string()
    })
    .parse({
        name: formData.get("name"),
        students: Number(formData.get("students")) || 0,
        year: Number(formData.get("year")) || Number(new Date().getFullYear()),
        specialityId: formData.get("specialityId")
    })

    await db.group.create({data: fd})

    revalidatePath("/group")
}

export async function updateGroup (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        name: z.string(),
        students: z.number(),
        year: z.number(),
        specialityId: z.string()
    })
    .parse({
        id: formData.get("id"),
        name: formData.get("name"),
        students: Number(formData.get("students")) || 0,
        year: Number(formData.get("year")) || Number(new Date().getFullYear()),
        specialityId: formData.get("specialityId")
    })

    await db.group.update({where: {id: fd.id}, data: fd})

    revalidatePath("/group")
    revalidatePath("/group/"+fd.id)
}

export async function deleteGroup (formData: FormData) {
    const fd = z.object({
        id: z.string()
    })
    .parse({
        id: formData.get("id")
    })

    await db.group.delete({where: {id: fd.id}})

    redirect("/group")
}