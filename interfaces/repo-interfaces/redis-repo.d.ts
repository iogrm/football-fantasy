interface RedisRepoInterface {
  setToRedis: (key: string, array: any) => Promise<void>;

  getFromRedis: (key: string) => Promise<{ [x: string]: string }>;
}
