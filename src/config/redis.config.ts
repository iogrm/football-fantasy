import * as redis from "redis";

let client: redis.RedisClientType;

export const redisConfig = async () => {
  client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST ?? "localhost",
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    },
  });
  client.connect();
  client.on("connect", function () {
    console.log("redis database is connected...");
  });

  return client;
};
