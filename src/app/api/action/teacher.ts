"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"
import { divForm } from "~/styles/daisystyles"

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
        teacherId: z.string(),
        disciplineId: z.string(),
    })
    .parse({
        teacherId: formData.get("id_teacher"),
        disciplineId: formData.get("id_discipline"),
    })
    
    await db.teacherDiscipline.create({data: fd})
    revalidatePath("/teacher/"+fd.teacherId)
}

export async function deleteTeacherDisc (formData: FormData) {
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


export async function updateDiscOfTeacher(formData: FormData) {
    const fd = z
    .object({
        id: z.string(),
        teacherId: z.string(),
        lectures: z.boolean(),
        subgroup: z.string()
    })
    .parse({
        id: formData.get("id"),
        teacherId: formData.get("teacherId"),
        lectures: formData.get("lectures") == "on" ? true : false,
        subgroup: formData.get("subgroup") ?? "2"
    })

    console.log(fd, "\n\n")
    
    await db.teacherDiscipline.update({
        where: { id: fd.id},
        data: {
            lectures: fd.lectures,
            subgroup: fd.subgroup
        }
    })
    revalidatePath("/teacher/"+fd.teacherId)
}
