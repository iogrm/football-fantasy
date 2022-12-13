import UserDao from "../dao/user-dao";
import { Op } from "sequelize";

class UserRepository implements UserRepositoryInterface {
  constructor(private UserModel: UserModelType) {}

  create = async (data: CreateUserInputType) => {
    let user = await this.UserModel.create(
      {
        ...data,
        // @ts-ignore
        team: { name: `${data.username}'s Team`, credit: 1000 },
      },
      { include: "team" }
    );

    return UserDao.convert(user);
  };

  update = async (userId: number, data: Partial<CreateUserInputType>) => {
    let res = await this.UserModel.update(data, { where: { id: userId } });

    return res[0] !== 0;
  };

  getUsers = async () => {
    const users = await this.UserModel.findAll({ include: "team" });

    return UserDao.convertMany(users);
  };

  getAuthInfoByUsername = async (username: string) => {
    const user = await this.UserModel.findOne({
      where: { username: username },
    });

    return user ? UserDao.getAuthInfo(user) : null;
  };

  getUsersByids = async (ids: number[]) => {
    if (!ids.length) return [];
    let users = await this.UserModel.findAll({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    });

    return UserDao.convertMany(users);
  };

  getUserById = async (id: number) => {
    const user = await this.UserModel.findByPk(id, { include: "team" });

    return user ? UserDao.convert(user) : null;
  };

  getUserByUsername = async (username: string) => {
    const user = await this.UserModel.findOne({
      where: { username: username },
      include: "team",
    });

    return user ? UserDao.convert(user) : null;
  };

  getUserByEmail = async (email: string) => {
    const user = await this.UserModel.findOne({
      where: { email: email },
      include: "team",
    });

    return user ? UserDao.convert(user) : null;
  };

  getPaginatedUsers = async ({
    limit,
    skip,
    search = "",
  }: {
    limit: number;
    skip: number;
    search: string;
  }): Promise<PaginatedOutputType<UserOutputType>> => {
    let searchStatement = {
      [Op.or]: [
        { firstname: { [Op.iLike]: `%${search}%` } },
        { lastname: { [Op.iLike]: `%${search}%` } },
        { username: { [Op.iLike]: `%${search}%` } },
      ],
    };

    console.log(limit, skip, search);

    let result = await this.UserModel.findAndCountAll({
      limit: limit,
      offset: skip,
      where: searchStatement,
    });

    return { count: result.count, values: UserDao.convertMany(result.rows) };
  };
}

export default UserRepository;
