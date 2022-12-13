import { Op } from "sequelize";
import PlayerDao from "../dao/player-dao";

class PlayerRepository implements PlayerRepositoryInterface {
  constructor(private PlayerModel: PlayerModelType) {}

  bulkUpsertPlayer = async (datas: CreatePlayerInputType[]) => {
    let players = await this.PlayerModel.bulkCreate(datas, {
      updateOnDuplicate: ["role", "webname"],
      returning: true,
    });

    return PlayerDao.convertManyNoStats(players);
  };

  getPlayerById = async (id: number) => {
    let player = await this.PlayerModel.findByPk(id, {
      include: {
        limit: 1,
        association: "playerStats",
        order: [["id", "DESC"]],
      },
    });

    return player ? PlayerDao.convert(player) : null;
  };

  getAllPlayers = async () => {
    let players = await this.PlayerModel.findAll({
      include: {
        limit: 1,
        association: "playerStats",
        order: [["id", "DESC"]],
      },
    });

    return PlayerDao.convertMany(players);
  };

  getPaginatedPlayers = async (
    limit: number,
    skip: number,
    role: PlayerRolesType | "All" = "All",
    search: string = ""
  ): Promise<PaginatedOutputType<PlayerOutputType>> => {
    let searchStatement = {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { secondName: { [Op.iLike]: `%${search}%` } },
      ],
    };

    let result = await this.PlayerModel.findAndCountAll({
      limit: limit,
      offset: skip,
      where: role === "All" ? searchStatement : { ...searchStatement, role },
      include: {
        limit: 1,
        association: "playerStats",
        order: [["id", "DESC"]],
      },
    });


    return { count: result.count, values: PlayerDao.convertMany(result.rows) };
  };
}

export default PlayerRepository;
