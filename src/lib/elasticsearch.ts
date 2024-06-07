import { Client } from '@elastic/elasticsearch';
import { env } from '$env/dynamic/private'

const elasticClient = new Client({
	cloud: {
		id: env.ELASTIC_SEARCH_CLOUD_ID
	},
	auth: {
		apiKey: env.ELASTIC_SEARCH_API_KEY
	}
});

export default elasticClient;
