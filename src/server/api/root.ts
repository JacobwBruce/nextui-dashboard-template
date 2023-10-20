import { createTRPCRouter } from "~/server/api/trpc";
import { customerRouter } from "./routers/customer";
import { locationRouter } from "./routers/location";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  customer: customerRouter,
  location: locationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
