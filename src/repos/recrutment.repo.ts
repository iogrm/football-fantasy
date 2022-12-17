import RecrutmentDao from "../dao/recrutment-dao";

class RecrutmentRepository implements RecrutmentRepositoryInterface {
  constructor(private RecrutmentModel: RecrutmentModelType) {}

  createRecrutment = async (
    teamId: number,
    playerId: number,
    positionNum: number,
    isPlaying: boolean
  ): Promise<RecrutmentOutputType> => {
    let rec = await this.RecrutmentModel.create({
      teamId,
      playerId,
      positionNum,
      isPlaying,
    });

    return RecrutmentDao.convert(rec);
  };

  reomveRecrutment = async (teamId: number, positionNum: number) => {
    return await this.RecrutmentModel.destroy({
      where: { teamId, positionNum },
    });
  };

  replaceRecrutment = async (
    teamId: number,
    playerId: number,
    position: number,
    isPlaying: boolean
  ): Promise<RecrutmentOutputType> => {
    await this.reomveRecrutment(teamId, position);
    let rec = await this.createRecrutment(
      teamId,
      playerId,
      position,
      isPlaying
    );
    return rec;
  };
}

export default RecrutmentRepository;
