import ReplacementLog from "../models/replacement-log";

export default abstract class ReplacementDao {
  static convert = (model: ReplacementLog): replacementLogType => {
    return {
      weekId: model.weekId,
      teamId: model.teamId,
      oldPlayerId: model.oldPlayerId,
      newPlayerId: model.newPlayerId,
      position: model.position,
    };
  };

  static convertMany = (models: ReplacementLog[]): replacementLogType[] => {
    const records: replacementLogType[] = models.map((model) => {
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
