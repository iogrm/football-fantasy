import Player from "../model/player.model";
import Recrutment from "../model/recrutment.model";
import Team from "../model/team.model";
import PlayerDao from "./player.dao";

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
