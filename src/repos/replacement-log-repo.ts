import ReplacementDao from "../dao/replacementlog-dao";

class ReplacementLogRepository implements ReplacementLogRepositoryInterface {
  constructor(private replacementLogModel: ReplacementLogModelType) {}
  recordLog = async (rec: {
    weekId: number;
    teamId: number;
    oldPlayerId: number;
    newPlayerId: number;
    position: number;
  }): Promise<replacementLogType> => {
    let record = await this.replacementLogModel.create({
      weekId: rec.weekId,
      teamId: rec.teamId,
      oldPlayerId: rec.oldPlayerId,
      newPlayerId: rec.newPlayerId,
      position: rec.position,
    });

    return ReplacementDao.convert(record);
  };

  getPositionRecordes = async (
    weekId: number,
    teamId: number,
    position: number
  ) => {
    let records = await this.replacementLogModel.findAll({
      where: { weekId: weekId, teamId: teamId, position: position },
    });
    return ReplacementDao.convertMany(records);
  };

  getTeamRecordes = async (weekId: number, teamId: number) => {
    let records = await this.replacementLogModel.findAll({
      where: { weekId: weekId, teamId: teamId },
    });
    return ReplacementDao.convertMany(records);
  };
}

export default ReplacementLogRepository;
