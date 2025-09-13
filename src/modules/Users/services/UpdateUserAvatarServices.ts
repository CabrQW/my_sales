import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import uploadConfig from "@config/upload";
import path from "path";
import fs from 'fs'

interface IRequest {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName} : IRequest): Promise<User> {
    const user = await usersRepositories.findById(userId)

    if(!user) {
      throw new AppError("User not found", 404);
    }

    if(user.avatar) {
      const userAvartarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvartarFileExister = await fs.promises.stat(userAvartarFilePath)

      if(userAvartarFileExister) {
        await fs.promises.unlink(userAvartarFilePath)
      }
    }

    user.avatar = avatarFileName
    await usersRepositories.save(user)
    return user
  }
}