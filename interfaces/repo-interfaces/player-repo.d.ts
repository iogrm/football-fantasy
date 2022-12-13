type PlayerRepositoryInterface = {
  bulkUpsertPlayer: (
    datas: CreatePlayerInputType[]
  ) => Promise<PlayerOutputTypeNoStats[]>;

  getPlayerById: (id: number) => Promise<PlayerOutputType | null>;

  getAllPlayers: () => Promise<PlayerOutputType[]>;

  getPaginatedPlayers: (
    limit: number,
    skip: number,
    role: PlayerRolesType | "All" = "All",
    search: string = ""
  ) => Promise<GetPaginatedType<PlayerOutputType>>;
};
