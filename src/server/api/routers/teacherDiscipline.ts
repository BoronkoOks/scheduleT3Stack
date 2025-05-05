import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teacherDisciplineRouter = createTRPCRouter({
    getByTeacherId: protectedProcedure
        .input(
            z.object({
                teacherId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const discs = await ctx.db.teacherDiscipline.findMany({
                where: {teacherId: input.teacherId}
            })

            return discs ?? []
        }),

    getByDisciplineId: protectedProcedure
        .input(
            z.object({
                disciplineId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const discs = await ctx.db.teacherDiscipline.findMany({
                where: {disciplineId: input.disciplineId},
                include: {teacher: true}
            })

            return discs ?? []
        })
})