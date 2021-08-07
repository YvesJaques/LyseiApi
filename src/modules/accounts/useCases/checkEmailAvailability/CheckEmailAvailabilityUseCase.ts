import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CheckEmailAvailabilityUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const userAlreadyexists = await this.usersRepository.findByEmail(email);

    if (userAlreadyexists) throw new AppError("Email already in use!");
  }
}

export { CheckEmailAvailabilityUseCase };
