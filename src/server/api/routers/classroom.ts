import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const classroomRouter = createTRPCRouter({
    getList: protectedProcedure
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
})