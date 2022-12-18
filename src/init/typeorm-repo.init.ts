import { DataSource } from 'typeorm';
import * as redis from 'redis';
import { Player } from '../typeorm/entity/Player';
import { RedisRepo } from '../sequelize/repo/redis.repo';
import { PlayerStatus } from '../typeorm/entity/PlayerStatus';
import { AllTypeormRepositories } from '../../interfaces/dependencies/repos';
import { Recrutment } from '../typeorm/entity/Recrutment';
import { Team } from '../typeorm/entity/Team';
import { User } from '../typeorm/entity/User';
import { Week } from '../typeorm/entity/Week';
import { Follow } from '../typeorm/entity/Follow';
import { Replacement } from '../typeorm/entity/Replacement';
import { Like } from '../typeorm/entity/Like';
import { WeekRepository } from '../typeorm/repo/week.repo';

export const initRepositories = (deps: {
  dataSource: DataSource;
  redis: redis.RedisClientType;
}): AllTypeormRepositories => ({
  playerRepo: deps.dataSource.getRepository(Player),
  playerStatusRepo: deps.dataSource.getRepository(PlayerStatus),
  recrutmentRepo: deps.dataSource.getRepository(Recrutment),
  teamRepo: deps.dataSource.getRepository(Team),
  userRepo: deps.dataSource.getRepository(User),
  weekRepo: WeekRepository(deps.dataSource),
  followRepo: deps.dataSource.getRepository(Follow),
  replacementRepo: deps.dataSource.getRepository(Replacement),
  likeRepo: deps.dataSource.getRepository(Like),
  redisRepo: new RedisRepo(deps.redis),
});
