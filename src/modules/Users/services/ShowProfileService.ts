import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import { User } from '../infra/database/entities/User';
import { IUsersRepository } from '../domain/repositories/IUserRepositories';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default ShowProfileService;