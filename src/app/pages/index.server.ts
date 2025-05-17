import { PageServerLoad } from '@analogjs/router';
import { InstagramPost } from '../../models/instagram.model';

export const load = async ({ fetch }: PageServerLoad) => {
  const igApiUrl = import.meta.env['NODE_ENV'] === 'production'
    ? import.meta.env['MY_SERVER_SCRAPER_ENDPOINT']
    : '/api/instagram'

  return await fetch<InstagramPost[]>(igApiUrl);
};
