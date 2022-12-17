import * as redis from "redis";
import ReplacementLog from "../models/replacement-log";
import FollowRepository from "../follow/follow.repo";
import LikeRepository from "../vitrine/like.repo";
import PlayerRepository from "../player/player.repo";
import PlayerStatsRepository from "../repos/player-stats.repo";
import RecrutmentRepository from "../repos/recrutment.repo";
import { RedisRepo } from "../repos/redis.repo";
import ReplacementLogRepository from "../repos/replacement-log.repo";
import TeamRepository from "../team/team.repo";
import UserRepository from "../user/user.repo";
import WeekRepository from "../week/week.repo";

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
