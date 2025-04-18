"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"

export async function createDiscipline (formData: FormData) {
    const fd = z.object({
        name: z.string(),
        semesters: z.number().int().optional(),
        subgroups: z.boolean().optional()
    })
    .parse({
        name: formData.get("name"),
        semesters: Number(formData.get("semesters")) || undefined,
        subgroups: formData.get("subgroups") == "on" ? true : false
    })

    await db.discipline.create({data: fd})

    revalidatePath("/discipline")
}

export async function updateDiscipline (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        name: z.string(),
        semesters: z.number().int().optional(),
        subgroups: z.boolean().optional()
    })
    .parse({
        id: formData.get("id"),
        name: formData.get("name"),
        semesters: Number(formData.get("semesters")) || undefined,
        subgroups: formData.get("subgroups") == "on" ? true : false
    })

    await db.discipline.update({where: {id: fd.id}, data: fd})

    revalidatePath("/discipline")
    revalidatePath("/discipline/"+fd.id)
}

export async function deleteDiscipline (formData: FormData) {
    const fd = z.object({
        id: z.string()
    })
    .parse({
        id: formData.get("id")
    })

    await db.discipline.delete({where: {id: fd.id}})

    redirect("/discipline")
}

export async function deleteDiscipineTeacher (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        id_discipline: z.string()
    })
    .parse({
        id: formData.get("id"),
        id_discipline: formData.get("id_teacher")
    })

    await db.teacherDiscipline.delete({where: {id: fd.id}})
    revalidatePath("/discipline/"+fd.id_discipline)
}
