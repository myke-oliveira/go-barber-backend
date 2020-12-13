import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * execute
   */
  public async execute({ email, password }: RequestDTO): Promise<{user: User}> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error ('Incorret email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email/password combination.');
    }

    delete user.password;

    return { user };
  }
}

export default AuthenticateUserService;