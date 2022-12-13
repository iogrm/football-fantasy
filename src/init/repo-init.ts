import * as redis from "redis";
import ReplacementLog from "../models/replacement-log";
import FollowRepository from "../repos/follow-repo";
import LikeRepository from "../repos/like-repo";
import PlayerRepository from "../repos/player-repo";
import PlayerStatsRepository from "../repos/player-stats-repo";
import RecrutmentRepository from "../repos/recrutment-repo";
import { RedisRepo } from "../repos/redis-repo";
import ReplacementLogRepository from "../repos/replacement-log-repo";
import TeamRepository from "../repos/team-repo";
import UserRepository from "../repos/user-repo";
import WeekRepository from "../repos/week-repo";

export const initRepositories = (deps: {
  models: AllModels;
  redis: redis.RedisClientType;
}): AllRepositories => ({
  playerRepo: new PlayerRepository(deps.models.playerModel),
  playerStatsRepo: new PlayerStatsRepository(deps.models.playerStatsModel),
  recrutmentRepo: new RecrutmentRepository(deps.models.recrutmentModel),
  redisRepo: new RedisRepo(deps.redis),
  teamRepo: new TeamRepository(deps.models.teamModel),
  userRepo: new UserRepository(deps.models.userModel),
  weekRepo: new WeekRepository(deps.models.weekModel),
  followRepo: new FollowRepository(deps.models.followModel),
  replacementLogRepo: new ReplacementLogRepository(
    deps.models.replacementLogModel
  ),
  likeRepo: new LikeRepository(deps.models.likeModel),
});
