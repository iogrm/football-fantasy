const PlayerRoles = [
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards",
] as const;

type PlayerRolesArrayType = typeof PlayerRoles;

type PlayerRolesType = PlayerRolesArrayType[number];

type GetPlayersType = GetPaginatedType & {
  role: PlayerRolesType | "All";
  search: string;
};

type CreatePlayerInputType = {
  id: number;
  firstName: string;
  secondName: string;
  webname: string;
  club: string;
  role: PlayerRolesType;
  playerStats: {
    score: number;
    price: number;
    weekId: number;
  };
};

type PlayerOutputType = PlayerOutputTypeNoStats & {
  playerStats: PlayerStatsOutputType;
};

type PlayerOutputTypeNoStats = {
  id: number;
  firstName: string;
  secondName: string;
  webname: string;
  club: string;
  role: PlayerRolesType;
};

type FullPlayerOutputType = {
  id: number;
  firstName: string;
  secondName: string;
  webname: string;
  club: string;
  role: PlayerRolesType;
  playerStats: PlayerStatsOutputType[];
};
