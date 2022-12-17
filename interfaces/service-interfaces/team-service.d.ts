interface TeamServiceInterface {
  getTeamByUserId: (userId: number) => Promise<TeamOutputType | null>;

  removePlayer: (
    userId: number,
    positionNum: number
  ) => Promise<TeamOutputType | null | NotFoundErrorType | BadRequestErrorType>;

  addPlayer: (
    userId: number,
    playerId: number,
    positionNum: number
  ) => Promise<TeamOutputType | null | NotFoundErrorType | BadRequestErrorType>;

  swapPlayers: (
    userId: number,
    playerId: number,
    positionNum: number
  ) => Promise<TeamOutputType | null | NotFoundErrorType | BadRequestErrorType>;

  getTeamRecordes: (
    weekId: number,
    teamId: number
  ) => Promise<PositionRecordesType>;

  getFeildTeamById: (id: number) => Promise<TeamOutputType | null>;

  getFeildTeamByUserId: (userId: number) => Promise<TeamOutputType | null>;
}
