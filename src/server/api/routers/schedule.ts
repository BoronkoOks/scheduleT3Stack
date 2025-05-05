import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const scheduleRouter = createTRPCRouter({
    getForDayByTeacherId: protectedProcedure
        .input(
            z.object({
                teacherId: z.string(),
                evenWeek: z.boolean().optional(),
                day: z.number()
            })
        )
        .query(async ({ ctx, input }) => {
            const lessons = await ctx.db.schedule.findMany({
                where: {
                    AND: [
                        {teacherId: input.teacherId},
                        {evenWeek: input.evenWeek},
                        {day: input.day}
                    ]
                },
                include: {
                    discipline: true,
                    group: true,
                    classroom: true
                }
            })

            return lessons ?? []
        }),

    addLesson: protectedProcedure
        .input(
            z.object({
                evenWeek: z.boolean(),
                day: z.number(),
                lesson: z.number(),
                groupId: z.string(),
                lessontype: z.string(),
                subgroup: z.number().optional(),
                disciplineId: z.string(),
                teacherId: z.string(),
                classroomID: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const created = await ctx.db.schedule.create({
                data: {
                    evenWeek: input.evenWeek,
                    day: input.day,
                    lesson: input.lesson,
                    groupId: input.groupId,
                    lessontype: input.lessontype,
                    subgroup: input.subgroup,
                    disciplineId: input.disciplineId,
                    teacherId: input.teacherId,
                    classroomID: input.classroomID,
                }
            })

            return created
        })
})