import Replacement from "../model/replacement.model";

export default abstract class ReplacementDao {
  static convert = (model: Replacement): replacementType => {
    return {
      weekId: model.weekId,
      teamId: model.teamId,
      oldPlayerId: model.oldPlayerId,
      newPlayerId: model.newPlayerId,
      position: model.position,
    };
  };

  static convertMany = (models: Replacement[]): replacementType[] => {
    const records: replacementType[] = models.map((model) => {
      return {
        weekId: model.weekId,
        teamId: model.teamId,
        oldPlayerId: model.oldPlayerId,
        newPlayerId: model.newPlayerId,
        position: model.position,
      };
    });
    return records;
  };
}
