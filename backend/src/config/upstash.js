import { Ratelimit } from "@upstash/ratelimit" // ✅ Not RateLimit, it's Ratelimit
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config()

// Create Redis instance from env variables
const redis = Redis.fromEnv()

// Create a rate limiter (5 requests per 10 seconds)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
})

export default ratelimit
