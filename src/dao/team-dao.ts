import Player from "../models/player";
import Recrutment from "../models/recrutment";
import Team from "../models/team";
import PlayerDao from "./player-dao";

export default abstract class TeamDao {
  static convert = (model: Team): TeamOutputType => {
    const team = {
      ...model.toJSON(),
      players: this.convertRecrutmentToPlayer(
        (model?.recrutments ?? []) as Recrutment[]
      ),
    };

    delete team["recrutments"];

    return team;
  };

  static convertMany = (models: Team[]): TeamOutputType[] => {
    return models.map((model) => this.convert(model));
  };

  private static convertRecrutmentToPlayer = (
    models: Recrutment[]
  ): RecrutedPlayerOutputType[] => {
    return models.map((rec) => ({
      ...PlayerDao.convert(rec.player as Player),
      positionNum: rec.positionNum,
      isPlaying: rec.isPlaying,
    }));
  };
}
