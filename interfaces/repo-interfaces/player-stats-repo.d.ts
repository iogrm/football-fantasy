interface PlayerStatsRepositoryInterface {
  bulkCreatePlayerStats: (
    datas: PlayerStatsInputType[]
  ) => Promise<PlayerStatsOutputType[]>;
}
