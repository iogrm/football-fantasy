interface RefreshServiceInterface {
  refreshPremierLeagueDatas: () => void;
  refreshDB: (freshDatas: refreshDBInputType) => void;
  refreshWeeks: (datas: CreateWeekInputType[]) => Promise<WeekOutputType[]>;

  refreshPlayers: (
    datas: CreatePlayerInputType[]
  ) => Promise<PlayerOutputType[]>;
}
