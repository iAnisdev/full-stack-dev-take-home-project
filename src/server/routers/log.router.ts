import { LogService } from '$server/services/log.service';
import { createTRPCRouter, publicProcedure } from '$server/trpcContext';
import { logParamsSchema } from '$server/validations/log.schema';

export const logRouter = createTRPCRouter({
	getLog: publicProcedure.input(logParamsSchema).query(({ input }) => {
		return new LogService().getLogs(input);
	})
});
