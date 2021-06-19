import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    name,
    cpf,
    email,
    avatar,
    state,
    city,
    isPolitician,
    occupation,
    created_at,
  }: User): IUserResponseDTO {
    const user = classToClass({
      name,
      cpf,
      email,
      avatar,
      state,
      city,
      isPolitician,
      occupation,
      created_at,
    });
    return user;
  }
}

export { UserMap };
