import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    cpf,
    email,   
    isPolitician 
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyexists = await this.usersRepository.findByEmail(email);

    if (userAlreadyexists) throw new AppError("User already exists!");

    const passwordHash = await hash(password, 8);
    
    await this.usersRepository.create({
      name,    
      cpf,
      email,      
      password: passwordHash,
      isPolitician
    });
  }
}

export { CreateUserUseCase };
