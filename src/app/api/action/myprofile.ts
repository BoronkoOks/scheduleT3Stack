"use server"

import { revalidatePath } from "node_modules/next/cache"
import { redirect } from "node_modules/next/navigation"
import {z} from "zod"
import { db } from "~/server/db"


export async function updateProfile (formData: FormData) {
    const fd = z.object({
        id: z.string(),
        email: z.string(),
        name: z.string()
    })
    .parse({
        id: formData.get("id"),
        email: formData.get("email"),
        name: formData.get("name")
    })
    
    await db.user.update({
        where: {id: fd.id},
        data: {
            email: fd.email,
            name: fd.name
        }
    })

    revalidatePath("/myprofile")
}