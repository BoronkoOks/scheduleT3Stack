import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const disciplineRouter = createTRPCRouter({
    getListByGroupId: protectedProcedure // Дисциплины группы на текущий сесместр
        .input(
            z.object({
                groupId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const groupInfo = await ctx.db.group.findFirst({
                where: {
                    id: input.groupId
                }
            })

            const academicPlan = await ctx.db.academicPlan.findMany({
                where: {
                    discSpec: {
                        speciality: {
                            Group: {
                                some: {
                                    id: input.groupId
                                }
                            }
                        }
                    }
                },
                include: {
                    discSpec: {
                        include: {
                            discipline: true
                        }
                    }
                }
            })

            const currentYear = new Date().getFullYear()
            const correction = new Date().getMonth() > 8 ? 1 : 0
            const semester = (currentYear - (groupInfo?.year || 0))*2 + correction

            const plans = academicPlan.filter(ap =>
                ap.semester == semester
            )

            const disciplines = plans.map(p =>
                p.discSpec.discipline
            )

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
        }),

    getListByTeacherId: protectedProcedure
        .input(
            z.object({
                teacherId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const discs = await ctx.db.teacherDiscipline.findMany({
                where: {teacherId: input.teacherId},
                include: {discipline: true}
            })

            return discs ?? []
        })
})