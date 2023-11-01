import { createTRPCRouter } from "~/server/api/trpc"

import { eventRouter } from "./routers/event"
import { imageRouter } from "./routers/image"
import { resetRouter } from "./routers/reset"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  reset: resetRouter,
  image: imageRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
