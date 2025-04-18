"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"

export async function updateTeacher (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        surname: z.string(),
        name: z.string(),
        fathername: z.string()
    })
    .parse({
        id: formData.get("id"),
        surname: formData.get("surname"),
        name: formData.get("name"),
        fathername: formData.get("fathername")        
    })

    await db.teacher.update({where: {id: fd.id}, data: fd})

    revalidatePath("/teacher")
    revalidatePath("/teacher/"+fd.id)
}


export async function deleteTeacher (formData: FormData) {
    const fd = z.object({
        id: z.string()
    })
    .parse({
        id: formData.get("id")
    })

    await db.teacher.delete({where: {id: fd.id}})

    redirect("/teacher")
}

export async function createTeacher (formData: FormData) {
    const fd = z.object({
        surname: z.string(),
        name: z.string(),
        fathername: z.string()
    })
    .parse({
        surname: formData.get("surname"),
        name: formData.get("name"),
        fathername: formData.get("fathername")        
    })

    await db.teacher.create({data: fd})

    revalidatePath("/teacher")
}


export async function addDiscToTeacher(formData: FormData) {
    const fd = z
      .object({
        id_teacher: z.string(),
        id_discipline: z.string(),
      })
      .parse({
        id_teacher: formData.get("id_teacher"),
        id_discipline: formData.get("id_discipline"),
      })
}

export async function deleteTeacherDiscipline (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        id_teacher: z.string()
    })
    .parse({
        id: formData.get("id"),
        id_teacher: formData.get("id_teacher")
    })

    await db.teacherDiscipline.delete({where: {id: fd.id}})
    revalidatePath("/teacher/"+fd.id_teacher)
}
