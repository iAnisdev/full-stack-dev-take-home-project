import { logRouter } from './routers/log.router';
import { createTRPCRouter } from './trpcContext';

export const appRouter = createTRPCRouter({
    logs: logRouter
});

export type AppRouter = typeof appRouter;
