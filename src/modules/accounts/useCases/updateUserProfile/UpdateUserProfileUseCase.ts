import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    cpf,
    email,
    state,
    city,
    isPolitician,
    occupation,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.usersRepository.findById(id);

    const cpfAlreadyexists = await this.usersRepository.findByCpf(cpf);
    const emailAlreadyexists = await this.usersRepository.findByEmail(email);

    if (user.email !== email && emailAlreadyexists)
      throw new AppError("Email already in use!");

    if (user.cpf !== cpf && cpfAlreadyexists)
      throw new AppError("Cpf already in use!");

    await this.usersRepository.update({
      id,
      name,
      cpf,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });
  }
}

export { UpdateUserProfileUseCase };
