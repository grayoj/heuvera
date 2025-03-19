console.log('🔍 Redis Debug: File is executing...');

import { Redis } from '@upstash/redis';

console.log('🔍 UPSTASH_REDIS_URL:', process.env.UPSTASH_REDIS_URL);
console.log(
  '🔍 UPSTASH_REDIS_TOKEN:',
  process.env.UPSTASH_REDIS_TOKEN ? 'Token is set' : 'Token is missing',
);

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Ensure async function runs
(async () => {
  console.log('🔍 Attempting Redis connection...');
  try {
    await redis.set('test', 'connected');
    const response = await redis.get('test');
    console.log('✅ Redis Connection Test:', response); // Should log "connected"
  } catch (error) {
    console.error('❌ Upstash Redis Connection Error:', error);
  }
})();
