import { trpcServer } from '$lib/trpc';

export async function load({ fetch }) {
	try {
		const logLogsResponse = await trpcServer(fetch).logs.getLog.query({
			start: new Date(new Date().setDate(new Date().getDate() - 7)),
			end: new Date()
		});
		return {
			logs: logLogsResponse
		};
	} catch (e) {
		console.error(e);
		return {
			error: e,
			logs: []
		};
	}
}
