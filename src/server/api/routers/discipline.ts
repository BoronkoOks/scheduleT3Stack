import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const disciplineRouter = createTRPCRouter({
    getListByGroupId: protectedProcedure
        .input(
            z.object({
                groupId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const group = await ctx.db.group.findFirst({
                where: {id: input.groupId}
            })

            const specDiscs = await ctx.db.specialityDisc.findMany({
                where: {specialityId: group?.specialityId},
                include: {
                    discipline: true
                },
                orderBy: {
                    discipline: {
                        name: "asc"
                    }
                }
            })

            const disciplines = specDiscs.map(sd => {
                return {id: sd.discipline.id, name: sd.discipline.name}
            })

            return disciplines ?? []
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