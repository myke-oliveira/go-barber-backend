import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  /**
   * execute
   */
  public async execute({ email, password }: RequestDTO): Promise<{user: User, token: string}> {
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

    const token = sign({}, 'f5f26ab66cab70300fd5e113b5fc7764', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;