import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Group } from "@prisma/client";

export const groupRouter = createTRPCRouter({


    getByDisciplineId: protectedProcedure
        .input(
            z.object({
                disciplineId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            // const academicPlans = await ctx.db.academicPlan.findMany({
            //     where: {
            //         discSpec: {
            //             disciplineId: input.disciplineId
            //         }
            //     },
                // include: {
                //     speciality: {
                //         include: {
                //             SpecDisc: {
                //                 include: {
                //                     AcademicPlan: true
                //                 }
                //             }
                //         }
                //     }
                // },
                // orderBy: {
                //     name: "asc"
                // }
            // })
            const groupsArr = await ctx.db.group.findMany({
                where: {
                    speciality: {
                        SpecDisc: {
                            some: {
                                disciplineId: input.disciplineId
                            }
                        }
                    }
                },
                include: {
                    speciality: {
                        include: {
                            SpecDisc: {
                                include: {
                                    AcademicPlan: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    name: "asc"
                }
            })

            const currentYear = new Date().getFullYear()
            const correction = new Date().getMonth() > 8 ? 1 : 0

            const groups = groupsArr.filter(g =>
                g.speciality.SpecDisc.some(sd => sd.AcademicPlan.some(ap => 
                    ap.semester == (currentYear - g.year)*2 + correction))
            )

            const groupsShort = groups.map(g => {
                return {id: g.id, name: g.name}
            })

            return groupsShort ?? []
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