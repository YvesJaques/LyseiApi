import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    cpf,
    email,
    occupation,
    isPolitician,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyexists = await this.usersRepository.findByEmail(email);

    if (userAlreadyexists) throw new AppError("User already exists!");

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      password: passwordHash,
      cpf,
      email,
      occupation,
      isPolitician,
    });
  }
}

export { CreateUserUseCase };
