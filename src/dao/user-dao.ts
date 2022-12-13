import User from "../models/user";

const DEFUALT_IMAGE_NAME = "default.png";

export default abstract class UserDao {
  private static getImageUrl = (imageName: string) =>
    `uploads/images/small/${imageName}`;

  static convert = (model: User): UserOutputType => {
    return {
      id: model.id,
      username: model.username,
      firstname: model.firstname,
      lastname: model.lastname,
      email: model.email,
      birthday: model.birthday,
      country: model.country,
      profileImage: this.getImageUrl(model.profileImage ?? DEFUALT_IMAGE_NAME),
      age: 2,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
    };
  };

  static convertMany = (models: User[]): UserOutputType[] => {
    return models.map((model) => this.convert(model));
  };

  static getAuthInfo = (model: User): AuthOutputType => {
    return {
      id: model.id,
      username: model.username,
      password: model.password,
    };
  };
}
