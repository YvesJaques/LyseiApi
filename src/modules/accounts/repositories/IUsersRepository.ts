import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO): Promise<void>;
  resetPassword(id: string, password: string): Promise<void>;
  findByEmailOrCpf(email: string, cpf: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
