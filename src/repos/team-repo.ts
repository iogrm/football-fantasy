import TeamDao from "../dao/team-dao";

class TeamRepository implements TeamRepositoryInterface {
  constructor(private TeamModel: TeamModelType) {}

  getTeamById = async (id: number): Promise<TeamOutputType | null> => {
    let team = await this.TeamModel.findByPk(id, {
      include: [
        {
          association: "recrutments",
          include: [
            {
              association: "player",
              include: [
                {
                  limit: 1,
                  association: "playerStats",
                  order: [["id", "DESC"]],
                },
              ],
            },
          ],
        },
      ],
    });

    return team ? TeamDao.convert(team) : null;
  };

  getTeamByUserId = async (userId: number): Promise<TeamOutputType | null> => {
    let team = await this.TeamModel.findOne({
      where: { userId: userId },
      include: [
        {
          association: "recrutments",
          include: [
            {
              association: "player",
              include: [
                {
                  limit: 1,
                  association: "playerStats",
                  order: [["id", "DESC"]],
                },
              ],
            },
          ],
        },
      ],
    });

    return team ? TeamDao.convert(team) : null;
  };

  getTeamElevenById = async (id: number): Promise<TeamOutputType | null> => {
    let team = await this.TeamModel.findByPk(id, {
      include: [
        {
          association: "recrutments",
          separate: true,
          where: { isPlaying: true },
          include: [
            {
              association: "player",
              include: [
                {
                  limit: 1,
                  association: "playerStats",
                  order: [["id", "DESC"]],
                },
              ],
            },
          ],
        },
      ],
    });

    return team ? TeamDao.convert(team) : null;
  };

  getTeamElevenByUserId = async (
    userId: number
  ): Promise<TeamOutputType | null> => {
    let team = await this.TeamModel.findOne({
      where: { userId: 1 },
      include: [
        {
          association: "recrutments",
          separate: true,
          where: { isPlaying: true },
          include: [
            {
              association: "player",
              include: [
                {
                  limit: 1,
                  association: "playerStats",
                  order: [["id", "DESC"]],
                },
              ],
            },
          ],
        },
      ],
    });

    return team ? TeamDao.convert(team) : null;
  };
  incrementTeamCredit = async (
    teamId: number,
    value: number
  ): Promise<boolean> => {
    await this.TeamModel.increment(
      { credit: value },
      { where: { id: teamId } }
    );

    return true;
  };
}

export default TeamRepository;
