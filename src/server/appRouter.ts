import { createTRPCRouter } from './trpcContext';

export const appRouter = createTRPCRouter({
});

export type AppRouter = typeof appRouter;
