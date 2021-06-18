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

    const userAlreadyexists = await this.usersRepository.findByEmailOrCpf(
      email,
      cpf,
    );

    if ((user.email !== email || user.cpf !== cpf) && userAlreadyexists)
      throw new AppError("Email or CPF already in use!");

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
