interface PlayerServiceInterface {
  getPaginatedPlayers: (
    data: GetPlayersType
  ) => Promise<PaginatedOutputType<PlayerOutputType>>;

  getPlayerById: (
    playerId: number
  ) => Promise<PlayerOutputType | NotFoundErrorType>;
}
