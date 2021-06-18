import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  async execute(user_id: string, password: string): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    user.password = await hash(password, 8);

    await this.userRepository.resetPassword(user.id, user.password);
  }
}

export { ResetUserPasswordUseCase };
