import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
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
    password,
    email,
    state,
    city,
    isPolitician,
    occupation,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      cpf,
      password,
      email,
      state,
      city,
      isPolitician,
      occupation,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async update({
    id,
    name,
    cpf,
    email,
    state,
    city,
    isPolitician,
    occupation,
  }: IUpdateUserDTO): Promise<void> {
    this.repository.update(
      { id },
      { name, cpf, email, state, city, isPolitician, occupation },
    );
  }

  async resetPassword(id: string, password: string): Promise<void> {
    this.repository.update({ id }, { password });
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

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ cpf });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
