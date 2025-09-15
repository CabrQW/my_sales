import AppError from "@shared/errors/AppError";
import { UserTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { isAfter, addHours} from "date-fns";
import { hash } from "bcrypt";

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  async execute({token, password}: IResetPassword): Promise<void> {
    const userToken = await UserTokensRepositories.findByToken(token)

    if(!userToken) {
      throw new AppError("User token not exists.", 404)
    }

    const user = await usersRepositories.findOne({
      where: { id: userToken.user_id },
    });

    if(!user){
      throw new AppError("User not exists",404)
    }

    const tokenCreatedat = userToken.created_at
    const compareDate = addHours(tokenCreatedat, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.",401)
    }

    user.password = await hash(password, 10)
    await usersRepositories.save(user)
  }
}