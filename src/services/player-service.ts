import { NotFoundError } from "../errors/not-found-error";

class PlayerService implements PlayerServiceInterface {
  constructor(
    private playerRepo: PlayerRepositoryInterface,
    private playerStatsRepo: PlayerStatsRepositoryInterface
  ) {}

  getPaginatedPlayers = async ({
    page,
    num,
    search,
    role,
    order,
    sortBy,
  }: GetPlayersType): Promise<PaginatedOutputType<PlayerOutputType>> => {
    let players: PlayerOutputType[] = (await this.playerRepo.getAllPlayers())
      .filter(
        (x) =>
          (role === "All" ? true : role === x.role) &&
          `${x.firstName} ${x.secondName}`.includes(search)
      )
      .sort(
        (x, y) =>
          (order === "ASC" ? -1 : 1) *
          (sortBy === "price"
            ? y.playerStats.price - x.playerStats.price
            : y.playerStats.score - x.playerStats.score)
      );

    return {
      count: players.length,
      values: players.slice((page - 1) * num, page * num),
    };
  };

  getPlayerById = async (
    playerId: number
  ): Promise<PlayerOutputType | NotFoundErrorType> => {
    const player = await this.playerRepo.getPlayerById(playerId);
    if (!player) return new NotFoundError("Player");

    return player;
  };
}

export default PlayerService;
