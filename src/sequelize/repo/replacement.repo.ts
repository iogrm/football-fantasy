import ReplacementDao from '../../dao/replacement.dao';

class ReplacementRepository implements ReplacementRepositoryInterface {
  constructor(private replacementModel: ReplacementModelType) {}
  recordLog = async (rec: {
    weekId: number;
    teamId: number;
    oldPlayerId: number;
    newPlayerId: number;
    position: number;
  }): Promise<replacementType> => {
    let record = await this.replacementModel.create({
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
    let records = await this.replacementModel.findAll({
      where: { weekId: weekId, teamId: teamId, position: position },
    });
    return ReplacementDao.convertMany(records);
  };

  getTeamRecordes = async (weekId: number, teamId: number) => {
    let records = await this.replacementModel.findAll({
      where: { weekId: weekId, teamId: teamId },
    });
    return ReplacementDao.convertMany(records);
  };
}

export default ReplacementRepository;
