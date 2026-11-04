import { Api } from '#lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		return { files: await new Api().getFiles(fetch), error: false };
	} catch (e) {
		console.error(e);
		return { files: [], error: true };
	}
};
