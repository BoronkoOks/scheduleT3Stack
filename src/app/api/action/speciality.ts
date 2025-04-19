"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"

export async function createSpeciality (formData: FormData) {
    const fd = z.object({
        name: z.string(),
        code: z.string(),
        years: z.number()
    })
    .parse({
        name: formData.get("name"),
        code: formData.get("code"),
        years: Number(formData.get("years"))
    })

    await db.speciality.create({data: fd})

    revalidatePath("/speciality")
}

export async function updateSpeciality(formData: FormData) {
    const fd = z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
        years: z.number()
    })
    .parse({
        id: formData.get("id"),
        name: formData.get("name"),
        code: formData.get("code"),
        years: Number(formData.get("years"))
    })

    await db.speciality.update({where: {id: fd.id}, data: fd})

    revalidatePath("/speciality")
    revalidatePath("/speciality/"+fd.id)
}

export async function deleteSpeciality (formData: FormData) {
    const fd = z.object({
        id: z.string()
    })
    .parse({
        id: formData.get("id")
    })

    await db.speciality.delete({where: {id: fd.id}})

    redirect("/speciality")
}

export async function deleteSpecDisc (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        id_speciality: z.string()
    })
    .parse({
        id: formData.get("id"),
        id_speciality: formData.get("id_speciality")
    })

    await db.specialityDisc.delete({where: {id: fd.id}})
    revalidatePath("/speciality/"+fd.id_speciality)
}

export async function addSpecDisc (formData: FormData) {
    const fd = z.object({
        disciplineId: z.string(),
        specialityId: z.string()
    })
    .parse({
        disciplineId: formData.get("disciplineId"),
        specialityId: formData.get("specialityId")
    })

    await db.specialityDisc.create({data: fd})
    revalidatePath("/speciality/"+fd.specialityId)
}

