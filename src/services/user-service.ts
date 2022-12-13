import UserDto from "../dto/user-dto";
import { NotFoundError } from "../errors/not-found-error";

class UserService implements UserServiceInterface {
  constructor(
    private userRepo: UserRepositoryInterface,
    private followRepo: FollowRepositoryInterface,
    private vitrineService: VitrineServiceInterface
  ) {}

  getUser = async (
    requestedUserId: number,
    userId: number
  ): Promise<LongUserOutputType | NotFoundErrorType> => {
    const user = await this.userRepo.getUserById(userId);
    if (!user) return new NotFoundError("User");

    let isFollowed = await this.followRepo.checkIsFollowed(
      userId,
      requestedUserId
    );
    let score = await this.vitrineService.getScore(userId);

    if (score instanceof NotFoundError) score = -1;
    return { ...UserDto.convertToFollowedUserOutput(user, isFollowed), score };
  };

  getPaginatedUsers = async (
    userId: number,
    data: GetPaginatedType & { search: string }
  ): Promise<PaginatedOutputType<ShortUserOutputType>> => {
    const { num, page, search } = data;
    let paginatedUsers: PaginatedOutputType<UserOutputType> =
      await this.userRepo.getPaginatedUsers({
        limit: num,
        skip: (page - 1) * num,
        search,
      });

    let followedUsers = await this.getFollowedUsers(
      paginatedUsers.values,
      userId
    );

    return {
      count: paginatedUsers.count,
      values: followedUsers.map((user) =>
        UserDto.convertToShortUserOutput(user)
      ),
    };
  };

  getFollowedUsers = async (
    users: UserOutputType[],
    userId: number
  ): Promise<FollowedUserOutputType[]> => {
    return await Promise.all(
      users.map(async (user) => {
        let isFollowed = await this.followRepo.checkIsFollowed(user.id, userId);

        return UserDto.convertToFollowedUserOutput(user, isFollowed);
      })
    );
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
}

export default UserService;
