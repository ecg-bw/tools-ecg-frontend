import { Api } from '#lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const api = new Api();

  return {
    shifts: await api.getShifts(fetch)
  };
};
