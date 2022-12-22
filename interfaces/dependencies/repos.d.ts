import { Repository } from "typeorm";
import { PlayerStatus } from "../../src/repo/typeorm/entity/PlayerStatus";
import { Player } from "../../src/repo/typeorm/entity/Player";
import { Week } from "../../src/repo/typeorm/entity/Week";
import { Recrutment } from "../../src/repo/typeorm/entity/Recrutment";
import { Replacement } from "../../src/repo/typeorm/entity/Replacement";
import { Team } from "../../src/repo/typeorm/entity/Team";
import { User } from "../../src/repo/typeorm/entity/User";
import { Follow } from "../../src/repo/typeorm/entity/Follow";
import { Like } from "../../src/repo/typeorm/entity/Like";

interface AllSequelizeRepositories extends AllRepositories {
  weekRepo: WeekRepositoryInterface;
  playerRepo: PlayerRepositoryInterface;
  playerStatusRepo: PlayerStatsRepositoryInterface;
  recrutmentRepo: RecrutmentRepositoryInterface;
  teamRepo: TeamRepositoryInterface;
  userRepo: UserRepositoryInterface;
  followRepo: FollowRepositoryInterface;
  replacementRepo: ReplacementRepositoryInterface;
  likeRepo: LikeRepositoryInterface;
  redisRepo: RedisRepoInterface;
}

type RefreshWeek = (
  refreshWeeks: CreateWeekInputType[]
) => Promise<UpdateResult>;
type WeekRepo = Repository<Week> & RefreshWeek;
interface AllTypeormRepositories extends AllRepositories {
  weekRepo: WeekRepo;
  playerRepo: Repository<Player>;
  playerStatusRepo: Repository<PlayerStatus>;
  recrutmentRepo: Repository<Recrutment>;
  teamRepo: Repository<Team>;
  userRepo: Repository<User>;
  followRepo: Repository<Follow>;
  replacementRepo: Repository<Replacement>;
  likeRepo: Repository<Like>;
  redisRepo: RedisRepoInterface;
}

interface AllRepositories {
  weekRepo: any;
  playerRepo: any;
  playerStatusRepo: any;
  recrutmentRepo: any;
  teamRepo: any;
  userRepo: any;
  followRepo: any;
  replacementRepo: any;
  likeRepo: any;
  redisRepo: any;
}
