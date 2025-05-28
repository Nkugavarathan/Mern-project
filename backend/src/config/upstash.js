import { RateLimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dotenv from "dotenv"
dotenv.config()

//create a ratelimiter that allows 10 requests per 20s
const ratelimit = new RateLimit()({
  redis: Redis.fromEnv(),
  limiter: RateLimit.slidingWindow(10, "20 s"),
})
export default ratelimit
