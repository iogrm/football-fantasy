import * as redis from 'redis';
import { AllRepositories } from '../../interfaces/dependencies/repos';
import FollowRepository from '../sequelize/repo/follow.repo';
import LikeRepository from '../sequelize/repo/like.repo';
import PlayerStatusRepository from '../sequelize/repo/player-stats.repo';
import PlayerRepository from '../sequelize/repo/player.repo';
import RecrutmentRepository from '../sequelize/repo/recrutment.repo';
import { RedisRepo } from '../sequelize/repo/redis.repo';
import ReplacementRepository from '../sequelize/repo/replacement.repo';
import TeamRepository from '../sequelize/repo/team.repo';
import UserRepository from '../sequelize/repo/user.repo';
import WeekRepository from '../sequelize/repo/week.repo';

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
