import PlayerStatsDao from "../dao/player-stats.dao";

class PlayerStatusRepository implements PlayerStatsRepositoryInterface {
  constructor(private PlayerStatus: PlayerStatusModelType) {}

  bulkCreatePlayerStats = async (datas: PlayerStatusInputType[]) => {
    let stats = await this.PlayerStatus.bulkCreate(datas);

    return PlayerStatsDao.convertMany(stats);
  };
}

export default PlayerStatusRepository;
