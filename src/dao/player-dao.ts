import Player from "../models/player";

export default abstract class PlayerDao {
  static convert = (model: Player): PlayerOutputType => {
    return this.unpopulatePlayerStats(
      model.toJSON() as unknown as FullPlayerOutputType
    );
  };

  static convertMany = (models: Player[]): PlayerOutputType[] => {
    return models.map((model) => this.convert(model));
  };

  static convertManyNoStats = (models: Player[]): PlayerOutputTypeNoStats[] => {
    return models.map(
      (model) => ({ ...model.toJSON() } as PlayerOutputTypeNoStats)
    );
  };

  private static unpopulatePlayerStats = (player: FullPlayerOutputType) => {
    return {
      ...player,
      playerStats: (player.playerStats ?? [])[0] ?? [],
    } as PlayerOutputType;
  };

  // again I bring it ...
  // warning
  static mergePlayerAndStatsOutput = (
    player: PlayerOutputTypeNoStats,
    stats: PlayerStatsOutputType
  ): PlayerOutputType => {
    return { ...player, playerStats: stats };
  };
}
