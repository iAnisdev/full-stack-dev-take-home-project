import type { LogParams, LogResponse } from '$server/validations/log.schema';
import { env } from '$env/dynamic/private';
import elasticClient from '$lib/elasticsearch.js';

export class LogService {
	async getLogs(param: LogParams): Promise<LogResponse> {
		const res = await elasticClient.search({
			index: env.ELASTIC_SEARCH_INDEX,
			body: {
				size: 0,
				aggs: {
					by_country: {
						terms: {
							field: 'geo.dest'
						},
						aggs: {
							by_hour: {
								date_histogram: {
									field: '@timestamp',
									calendar_interval: 'hour'
								},
								aggs: {
									unique_visitors: {
										cardinality: {
											field: 'clientip'
										}
									}
								}
							}
						}
					}
				}
			},
			query: {
				range: {
					utc_time: {
						gte: param.start.toISOString(),
						lte: param.end.toISOString()
					}
				}
			}
		});

		const formattedData: LogResponse[] = [];
		const countries = res.aggregations.by_country.buckets;

		countries.forEach((country) => {
			const countryKey = country.key;
			const hours = country.by_hour.buckets;

			hours.forEach((hour) => {
				const record: LogResponse = {
					key: countryKey,
					hour: new Date(hour.key).getUTCHours(),
					unique_visitors: hour.unique_visitors.value
				};
				if (formattedData.some((item) => item.key === record.key && item.hour === record.hour)) {
					formattedData.forEach((item) => {
						if (item.key === record.key && item.hour === record.hour) {
							item.unique_visitors += record.unique_visitors;
						}
					});
				} else {
					formattedData.push(record);
				}
			});
		});

		return new Promise((resolve) => resolve(formattedData));
	}
}
