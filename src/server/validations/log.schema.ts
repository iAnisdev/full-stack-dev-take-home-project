import { z } from 'zod';

export const logParamsSchema = z.object({
	start: z.date(),
	end: z.date()
});

export const logResponseSchema = z.object({
    key: z.string(),
    hour: z.number(),
    unique_visitors: z.number()
});

export type LogParams = z.infer<typeof logParamsSchema>;
export type LogResponse = z.infer<typeof logResponseSchema>;
