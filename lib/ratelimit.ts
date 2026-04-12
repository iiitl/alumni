import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redisClient = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

interface RateLimitConfig {
  maxRequests: number;
  window: Duration;
}

const ratelimitCache = new Map<string, Ratelimit>();

export async function limit(key: string, config: RateLimitConfig) {
  if (!redisClient) {
    console.warn("Rate limiting bypassed: UPSTASH_REDIS credentials are missing.");
    return { success: true, limit: config.maxRequests, remaining: config.maxRequests, reset: 0, retryAfter: 0 };
  }

  // Retrieve existing rate limiter from cache, or create and cache a new one for this config
  const cacheKey = `${config.maxRequests}-${config.window}`;
  let ratelimit = ratelimitCache.get(cacheKey);

  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(config.maxRequests, config.window),
      analytics: true, 
    });
    ratelimitCache.set(cacheKey, ratelimit);
  }

  try {
    const result = await ratelimit.limit(key);

    // Calculate standard Retry-After in seconds
    const retryAfterSeconds = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));

    if (!result.success) {
      const breachKey = `breach_count:${key}`;
      
      const pipeline = redisClient.pipeline();
      pipeline.incr(breachKey);
      pipeline.expire(breachKey, 3600);
      
      const results = await pipeline.exec();
      const breachCount = results[0] as number;

      if (breachCount === 3) {
        console.log({
                    severity: 'WARNING',
                    event: 'CONSISTENT_RATE_LIMIT_BREACH',
                    target: key,
                    message: `Key breached rate limits ${breachCount} times within the hour.`,
                  });
      }
    }

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: retryAfterSeconds,
    };
  } catch (error) {
    console.error("Rate limiting error:", error);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: 0,
      retryAfter: 60,
    };
  }
}