import * as redis from "redis";
import { AllRepositories } from "../../../interfaces/dependencies/repos";
import FollowRepository from "./repo/follow.repo";
import LikeRepository from "./repo/like.repo";
import PlayerStatusRepository from "./repo/player-stats.repo";
import PlayerRepository from "./repo/player.repo";
import RecrutmentRepository from "./repo/recrutment.repo";
import { RedisRepo } from "./repo/redis.repo";
import ReplacementRepository from "./repo/replacement.repo";
import TeamRepository from "./repo/team.repo";
import UserRepository from "./repo/user.repo";
import WeekRepository from "./repo/week.repo";

export const initRepositories = (deps: {
  models: AllModels;
  redis: redis.RedisClientType;
}): AllRepositories => ({
  playerRepo: new PlayerRepository(deps.models.playerModel),
  playerStatusRepo: new PlayerStatusRepository(deps.models.playerStatsModel),
  recrutmentRepo: new RecrutmentRepository(deps.models.recrutmentModel),
  redisRepo: new RedisRepo(deps.redis),
  teamRepo: new TeamRepository(deps.models.teamModel),
  userRepo: new UserRepository(deps.models.userModel),
  weekRepo: new WeekRepository(deps.models.weekModel),
  followRepo: new FollowRepository(deps.models.followModel),
  replacementRepo: new ReplacementRepository(deps.models.replacementModel),
  likeRepo: new LikeRepository(deps.models.likeModel),
});
