import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logToAudit } from './audit-log'; 

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Define valid window formats expected by Upstash
type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

interface RateLimitConfig {
  maxRequests: number;
  window: Duration;
}

export async function limit(key: string, config: RateLimitConfig) {
  // Initialize the sliding window limiter with the custom config
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.maxRequests, config.window),
    analytics: true, 
  });

  const result = await ratelimit.limit(key);

  // Calculate standard Retry-After in seconds
  const retryAfterSeconds = Math.ceil((result.reset - Date.now()) / 1000);

  // Handle breach logging
  if (!result.success) {
    const breachKey = `breach_count:${key}`;
    
    // Increment a separate counter for breaches, expiring after 1 hour
    const breachCount = await redis.incr(breachKey);
    if (breachCount === 1) {
      await redis.expire(breachKey, 3600); 
    }

    // If they hit the 429 limit 3+ times in an hour, escalate to AuditLog
    if (breachCount >= 3) {
      await logToAudit({
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
    retryAfter: retryAfterSeconds > 0 ? retryAfterSeconds : 1,
  };
}