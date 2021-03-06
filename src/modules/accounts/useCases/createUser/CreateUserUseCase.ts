import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    cpf,
    password,
    email,
    state,
    city,
    isPolitician,
    occupation,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyexists = await this.usersRepository.findByEmailOrCpf(
      email,
      cpf,
    );

    if (userAlreadyexists) throw new AppError("User already exists!");

    if (
      isPolitician &&
      (occupation === "" || occupation === null || occupation === undefined)
    )
      throw new AppError("Occupation not entered for politician user!");

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      cpf,
      password: passwordHash,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });
  }
}

export { CreateUserUseCase };
