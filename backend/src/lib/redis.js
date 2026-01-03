import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis client error", err);
});

const connectToRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Connected to Redis at", REDIS_URL);
    }
  } catch (err) {
    console.error("Failed to connect to Redis", err);
  }
};

connectToRedis();