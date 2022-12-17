import PlayerStatsDao from "../dao/player-stats-dao";

class PlayerStatsRepository implements PlayerStatsRepositoryInterface {
  constructor(private PlayerStats: PlayerStatsModelType) {}

  bulkCreatePlayerStats = async (datas: PlayerStatsInputType[]) => {
    let stats = await this.PlayerStats.bulkCreate(datas);

    return PlayerStatsDao.convertMany(stats);
  };
}

export default PlayerStatsRepository;
