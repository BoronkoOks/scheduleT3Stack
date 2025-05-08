import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const classroomRouter = createTRPCRouter({
    getList: protectedProcedure // список кабинетов
        .input(
            z.object({
                query: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const classrooms = await ctx.db.classroom.findMany({
                where: {
                    name: {
                        contains: input.query, mode: "insensitive"
                    }
                },
                orderBy: {
                    name: "asc"
                }
            })

            return classrooms ?? []
        }),

    getFreeAtThisTime: protectedProcedure // список кабинетов, свободных в указанное время
        .input(
            z.object({
                query: z.string(),
                evenWeek: z.boolean(),
                day: z.number(),
                lesson: z.number()
            })
        )
        .query(async ({ ctx, input }) => {
            const classrooms = await ctx.db.classroom.findMany({
                where: {
                    AND: [
                        {
                            name: {
                                contains: input.query, mode: "insensitive"
                            }
                        },
                        {
                            Schedule: {
                                none: {
                                    evenWeek: input.evenWeek,
                                    day: input.day,
                                    lesson: input.lesson
                                }
                            }
                        }
                    ]
                    
                },
                orderBy: {
                    name: "asc"
                }
            })

            return classrooms ?? []
        }),
})