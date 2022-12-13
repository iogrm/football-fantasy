import UserDto from "./user-dto";

export default abstract class FollowDto {
  static convertGetPaginatedFollow = async (
    length: number,
    users: FollowedUserOutputType[]
  ): Promise<PaginatedOutputType<ShortUserOutputType>> => {
    return {
      count: length,
      values: users.map((u) => UserDto.convertToShortUserOutput(u)),
    };
  };
}
