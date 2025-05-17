import { eventHandler, setHeaders } from 'h3';

export default eventHandler((event) => {
  // Set CORS headers
  setHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '86400',
  });

  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.end();
    return;
  }
});