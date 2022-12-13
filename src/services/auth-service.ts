import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail, setText } from "../utils/email-service";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import { DuplicateError } from "../errors/duplicate-error";

type CreatingUserType = CreateUserInputType & { code: string };

class AuthService implements AuthServiceInterface {
  constructor(
    private userRepo: UserRepositoryInterface,
    private redisRepo: RedisRepoInterface
  ) {}

  private parseUserInfoFromRedis = (redisRes: {
    [x: string]: string;
  }): CreatingUserType | NotFoundErrorType => {
    try {
      const data: CreatingUserType = {
        username: redisRes.username,
        email: redisRes.email,
        country: redisRes.country,
        firstname: redisRes.firstname,
        lastname: redisRes.lastname,
        password: redisRes.password,
        code: redisRes.code,
        birthday: new Date(Date.parse(redisRes.birthday)),
      };
      return data;
    } catch (err) {
      return new NotFoundError("Username");
    }
  };

  private isValidRegisterInput = async ({
    username,
    email,
  }: CreateUserInputType): Promise<true | DuplicateErrorType> => {
    const userWithUsername = await this.userRepo.getUserByUsername(username);
    if (userWithUsername) return new DuplicateError("Username");
    const userWithEmail = await this.userRepo.getUserByEmail(email);
    if (userWithEmail) return new DuplicateError("Email");
    return true;
  };

  signup = async (
    data: CreateUserInputType
  ): Promise<true | DuplicateErrorType> => {
    const isValid = await this.isValidRegisterInput(data);
    if (isValid !== true) return isValid;
    const encriptedPass = await bcrypt.hash(data.password, 12);

    // const confirmation_code = generateConfirmationCode();
    const confirmation_code = 19283;
    console.log(confirmation_code);

    const user: CreatingUserType = {
      ...data,
      password: encriptedPass,
      code: confirmation_code.toString(),
    };

    sendMail(data.email, {
      subject: "High5 Confirmation",
      text: setText(data.firstname, confirmation_code),
    });

    await this.redisRepo.setToRedis(user.email, user);

    return true;
  };

  confirmation = async (data: {
    email: string;
    code: number;
  }): Promise<string | BadRequestErrorType | NotFoundErrorType> => {
    const registerig_user = this.parseUserInfoFromRedis(
      await this.redisRepo.getFromRedis(data.email)
    );

    if (registerig_user instanceof NotFoundError)
      return new NotFoundError("Username");

    const code = data.code.toString();

    if (registerig_user.code !== code)
      return new BadRequestError("InvalidValidationCode");

    await this.isValidRegisterInput(registerig_user);

    const user = await this.userRepo.create(registerig_user);

    let jwtPayload: JwtPayloadType = { userId: user.id };
    const token = jwt.sign(jwtPayload, process.env.SUPER_SECRET_KEY ?? "", {
      expiresIn: "12h",
    });
    return token;
  };

  login = async (
    username: string,
    password: string
  ): Promise<string | BadRequestErrorType | NotFoundErrorType> => {
    const user = await this.userRepo.getAuthInfoByUsername(username);

    if (!user) return new NotFoundError("User");

    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");

    if (!isPasswordValid) return new BadRequestError("InvalidPassword");

    let jwtPayload: JwtPayloadType = { userId: user.id };
    const token = jwt.sign(jwtPayload, process.env.SUPER_SECRET_KEY ?? "", {
      expiresIn: "12h",
    });

    return token;
  };

  getUser = async (
    userId: number
  ): Promise<UserOutputType | NotFoundErrorType> => {
    const user = await this.userRepo.getUserById(userId);

    if (!user) return new NotFoundError("User");

    return user;
  };

  getPaginatedUsers = async ({
    num,
    page,
    search,
  }: GetPaginatedType & { search: string }): Promise<
    PaginatedOutputType<UserOutputType[]>
  > => {
    return await this.userRepo.getPaginatedUsers({
      limit: num,
      skip: (page - 1) * num,
      search,
    });
  };
}

export default AuthService;
