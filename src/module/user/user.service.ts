import UserDto from "./user.dto";
import { NotFoundError } from "../../error/not-found-error";

class UserService implements UserServiceInterface {
  constructor(private userRepo: UserRepositoryInterface) {}

  getUser = async (
    requestedUserId: number,
    userId: number
  ): Promise<UserOutputType | NotFoundErrorType> => {
    const user = await this.userRepo.getUserById(userId);
    if (!user) return new NotFoundError("User");

    return user;
  };

  getUsersByIds = async (ids: number[]) => {
    return this.userRepo.getUsersByIds(ids);
  };

  getUserById = async (id: number) => {
    return this.userRepo.getUserById(id);
  };

  getPaginatedUsers = async (
    data: GetPaginatedType & { search: string }
  ): Promise<PaginatedOutputType<UserOutputType>> => {
    const { num, page, search } = data;
    let paginatedUsers: PaginatedOutputType<UserOutputType> =
      await this.userRepo.getPaginatedUsers({
        limit: num,
        skip: (page - 1) * num,
        search,
      });

    return {
      count: paginatedUsers.count,
      values: paginatedUsers.values,
    };
  };

  updateUserImage = async (
    userId: number,
    profileImage: string
  ): Promise<ShortUserOutputType | NotFoundErrorType> => {
    let user = await this.userRepo.getUserById(userId);
    if (!user) return new NotFoundError("User");
    await this.userRepo.update(userId, { profileImage: profileImage });
    user = await this.userRepo.getUserById(userId);
    if (!user) return new NotFoundError("User");
    let followedUser = UserDto.convertToFollowedUserOutput(user, false);

    return UserDto.convertToShortUserOutput(followedUser);
  };

  getUserByUsername = async (username: string) => {
    return this.userRepo.getUserByUsername(username);
  };

  getUserByEmail = async (email: string) => {
    return this.userRepo.getUserByEmail(email);
  };

  getAuthInfoByUsername = async (username: string) => {
    return this.userRepo.getAuthInfoByUsername(username);
  };

  createUser = async (data: CreateUserInputType) => {
    return this.userRepo.create(data);
  };
}

export default UserService;
