import PlayerStatus from "../model/player-stats.model";

export default abstract class PlayerStatsDao {
  static convert = (model: PlayerStatus): PlayerStatusOutputType => {
    return model.toJSON() as PlayerStatusOutputType;
  };

  static convertMany = (models: PlayerStatus[]): PlayerStatusOutputType[] => {
    return models.map((model) => model?.toJSON() as PlayerStatusOutputType);
  };
}
