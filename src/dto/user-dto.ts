export default abstract class UserDto {
  static convertToShortUserOutput = (
    user: FollowedUserOutputType
  ): ShortUserOutputType => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profileImage: user.profileImage,
      isFollowed: user.isFollowed,
      age: user.age,
    };
  };

  static convertToFollowedUserOutput = (
    user: UserOutputType,
    isFollowed: boolean
  ): FollowedUserOutputType => {
    return { ...user, isFollowed };
  };
}
