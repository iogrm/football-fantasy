interface PlayerStatsRepositoryInterface {
  bulkCreatePlayerStats: (
    datas: PlayerStatusInputType[]
  ) => Promise<PlayerStatusOutputType[]>;
}
