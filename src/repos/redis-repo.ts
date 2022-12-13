import * as redis from "redis";

export class RedisRepo implements RedisRepoInterface {
  constructor(private client: redis.RedisClientType) {}

  setToRedis = async (key: string, value: any) => {
    this.client.set(key, JSON.stringify(value));
  };

  getFromRedis = async (key: string) => {
    return JSON.parse((await this.client.get(key)) ?? "");
  };
}
