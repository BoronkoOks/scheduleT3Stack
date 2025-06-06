import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { teacherDisciplineRouter } from "./routers/teacherDiscipline";
import { disciplineRouter } from "./routers/discipline";
import { classroomRouter } from "./routers/classroom";
import { scheduleRouter } from "./routers/schedule";
import { groupRouter } from "./routers/group";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  teacherDiscipline: teacherDisciplineRouter,
  discipline: disciplineRouter,
  classroom: classroomRouter,
  schedule: scheduleRouter,
  group: groupRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
