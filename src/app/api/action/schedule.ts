"use server"

import { revalidatePath } from "node_modules/next/cache"
import { db } from "~/server/db"


export async function deleteSchedule (id: string) {
    await db.schedule.delete({where: {id: id}})

    revalidatePath("/schedule")
}