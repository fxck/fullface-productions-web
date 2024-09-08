import { eventHandler } from 'h3';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fetch from 'node-fetch';
import { InstagramPost } from '../../models/instagram.model';

interface InstagramApiPost {
  id: string;
  code: string;
  like_count: number;
  media_name: string;
  thumbnail_url: string;
  image_versions: {
    items: {
      url: string;
    }[];
  }
}

interface InstagramApiResponse {
  data: {
    count: number;
    items: InstagramApiPost[];
    user: Record<string, unknown>;
    pagination_token: string;
  };
}

const TOTAL_SIZE = 20;
const CACHE_DURATION = 10 * 60 * 1000;

let cachedPosts: InstagramPost[] | null = null;
let lastCacheTime: number = 0;

export default eventHandler(async () => {
  return await getPosts({
    rapidApiKey: import.meta.env['MY_SERVER_RAPIDAPI_KEY'],
    userId: import.meta.env['MY_SERVER_USER_ID'],
    s3: {
      endpoint: import.meta.env['MY_SERVER_S3_ENDPOINT'],
      region: import.meta.env['MY_SERVER_S3_REGION'] || 'us-east-1',
      accessKeyId: import.meta.env['MY_SERVER_S3_ACCESS_KEY'],
      secretAccessKey: import.meta.env['MY_SERVER_S3_SECRET_KEY'],
      bucketName: import.meta.env['MY_SERVER_S3_BUCKET_NAME']
    }
  });
});

async function getPosts(config: {
  rapidApiKey: string;
  userId: string;
  s3: {
    endpoint: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  };
}) {
  // Check if cache is valid
  if (cachedPosts && (Date.now() - lastCacheTime < CACHE_DURATION)) {
    console.log('Returning cached posts');
    return cachedPosts;
  }

  const s3Client = new S3Client({
    endpoint: config.s3.endpoint,
    region: config.s3.region,
    credentials: {
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey,
    },
    forcePathStyle: true
  });

  async function fetchPosts(paginationToken = ''): Promise<InstagramApiResponse> {
    const baseUrl = 'https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts';
    const url = `${baseUrl}?username_or_id_or_url=${config.userId}${paginationToken ? `&pagination_token=${paginationToken}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
        'x-rapidapi-key': config.rapidApiKey
      },
    });

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    return await response.json() as InstagramApiResponse;
  }

  function mapToOutputPost(post: InstagramApiPost, thumbnailUrl: string): InstagramPost | null {
    if (!thumbnailUrl) return null;
    return {
      id: post.id,
      code: post.code,
      like_count: post.like_count,
      media_name: post.media_name,
      thumbnail_url: thumbnailUrl
    };
  }

  let allPosts: InstagramPost[] = [];
  let paginationToken = '';

  while (allPosts.length < TOTAL_SIZE) {
    const apiResponse = await fetchPosts(paginationToken);

    console.log(`Loaded batch ${Math.round(allPosts.length / 12)}`);

    if (apiResponse.data && Array.isArray(apiResponse.data.items)) {
      for (const post of apiResponse.data.items) {
        if (post.thumbnail_url) {
          console.log(`Processing item ${post.id}`);

          try {
            const imageResponse = await fetch(post.image_versions.items[0].url);
            const imageBuffer = await imageResponse.arrayBuffer();

            await s3Client.send(new PutObjectCommand({
              Bucket: config.s3.bucketName,
              Key: `thumbnails/${post.id}.jpg`,
              Body: Buffer.from(imageBuffer),
              ContentType: 'image/jpeg'
            }));

            const endpointUrl = new URL(config.s3.endpoint);

            const outputPost = mapToOutputPost(
              post,
              `${endpointUrl.origin}/${config.s3.bucketName}/thumbnails/${post.id}.jpg`
            );

            if (outputPost) allPosts.push(outputPost);

          } catch (error) {
            console.error(`Failed to process thumbnail for post ${post.id}:`, error);
          }
        }
      }
    }

    if (apiResponse.data.pagination_token) {
      paginationToken = apiResponse.data.pagination_token;
    } else {
      break;
    }

    if (allPosts.length >= TOTAL_SIZE) break;
  }

  console.log(`Processing done`);

  // Update cache
  cachedPosts = allPosts.slice(0, TOTAL_SIZE);
  lastCacheTime = Date.now();

  return cachedPosts;
}
