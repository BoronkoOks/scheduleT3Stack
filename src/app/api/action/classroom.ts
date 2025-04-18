"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"


export async function updateClassroom (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        name: z.string(),
        seats: z.number().int().optional(),
        computers: z.number().int().optional(),
        projector: z.boolean().optional()
    })
    .parse({
        id: formData.get("id"),
        name: formData.get("name"),
        seats: Number(formData.get("seats")) || 0,
        computers: Number(formData.get("computers")) || 0,
        projector: formData.get("projector") == "on" ? true : false
    })

    await db.classroom.update({where: {id: fd.id}, data: fd})

    revalidatePath("/classroom")
    revalidatePath("/classroom/"+fd.id)
}