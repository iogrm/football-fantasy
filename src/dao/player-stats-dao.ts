import PlayerStats from "../models/player-stats";

export default abstract class PlayerStatsDao {
  static convert = (model: PlayerStats): PlayerStatsOutputType => {
    return model.toJSON() as PlayerStatsOutputType;
  };

  static convertMany = (models: PlayerStats[]): PlayerStatsOutputType[] => {
    return models.map((model) => model?.toJSON() as PlayerStatsOutputType);
  };
}
