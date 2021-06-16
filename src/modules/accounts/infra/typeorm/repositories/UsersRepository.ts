import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    cpf,
    email,
    password,
    isPolitician,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      cpf,
      email,
      password,
      isPolitician,
    });

    await this.repository.save(user);
  }

  async findByEmailOrCpf(email: string, cpf: string): Promise<User> {
    const user = await this.repository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .orWhere("user.cpf = :cpf", { cpf })
      .getOne();
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
