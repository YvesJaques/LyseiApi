import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    cpf,
    password,
    email,
    state,
    city,
    isPolitician,
    occupation,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      cpf,
      password,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });

    this.users.push(user);
  }

  async findByEmailOrCpf(email: string, cpf: string): Promise<User> {
    return this.users.find(user => user.email === email || user.cpf === cpf);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findByCpf(cpf: string): Promise<User> {
    return this.users.find(user => user.cpf === cpf);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
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
    const user = this.users.find(user => user.id === id);

    Object.assign(user, {
      name,
      cpf,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });
  }

  async resetPassword(id: string, password: string): Promise<void> {
    const user = this.users.find(user => user.id === id);

    Object.assign(user, {
      password,
    });
  }
}

export { UsersRepositoryInMemory };
