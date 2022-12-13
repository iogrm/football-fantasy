type CreateUserInputType = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  country: string;
  profileImage?: string;
};

type UserOutputType = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  birthday: Date;
  profileImage: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
};

type ShortUserOutputType = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  profileImage: string;
  isFollowed: boolean;
};

type FollowedUserOutputType = UserOutputType & { isFollowed: boolean };

type LongUserOutputType = FollowedUserOutputType & { score: number };

type AuthOutputType = {
  id: number;
  username: string;
  password: string;
};
