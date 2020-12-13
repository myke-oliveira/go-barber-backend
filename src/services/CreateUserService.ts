import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../models/User";
import usersRouter from "../routes/users.routes";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  /**
   * execute
   */
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('E-mail address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;