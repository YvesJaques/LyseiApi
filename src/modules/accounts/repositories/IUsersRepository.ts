import { User } from "../infra/typeorm/entities/User";

interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  cpf: number;
  email: string;
  avatar?: string;
  occupation?: string;
  isPolitician: boolean;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
