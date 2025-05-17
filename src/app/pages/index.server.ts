import { PageServerLoad } from '@analogjs/router';
import { InstagramPost } from '../../models/instagram.model';

// Simply return an empty array during build and let the client handle loading
export const load = async (): Promise<InstagramPost[]> => {
  return [];
};
