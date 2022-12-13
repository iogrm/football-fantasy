import PlayerDao from "../dao/player-dao";
import { fetchPremireLeague } from "../../premier-league/repo";
import { TimeoutError } from "../errors/network-error";

class RefreshService implements RefreshServiceInterface {
  constructor(
    private weekRepo: WeekRepositoryInterface,
    private playerRepo: PlayerRepositoryInterface,
    private playerStatsRepo: PlayerStatsRepositoryInterface
  ) {}

  refreshPremierLeagueDatas = async () => {
    const data = await fetchPremireLeague();
    if (data instanceof TimeoutError) {
    } else {
      this.refreshDB(data);
    }
  };

  refreshDB = async (freshDatas: freshDBInputType) => {
    const { weeks, players } = freshDatas;
    console.log("data is came from fpl");
    console.log(players[0]);
    console.log(weeks[0]);

    await this.refreshWeeks(weeks);
    await this.refreshPlayers(players);
  };

  refreshWeeks = async (freshWeeks: CreateWeekInputType[]) => {
    return this.weekRepo.refreshWeeks(freshWeeks);
  };

  refreshPlayers = async (
    freshPlayers: CreatePlayerInputType[]
  ): Promise<PlayerOutputType[]> => {
    let players = await this.playerRepo.bulkUpsertPlayer(freshPlayers);
    let playerStats = await this.playerStatsRepo.bulkCreatePlayerStats(
      players.map((x, index) => ({
        ...freshPlayers[index].playerStats,
        playerId: x.id,
      }))
    );

    return players.map((p, i) =>
      PlayerDao.mergePlayerAndStatsOutput(p, playerStats[i])
    );
  };
}

export default RefreshService;
