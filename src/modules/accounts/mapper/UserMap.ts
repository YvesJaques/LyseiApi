import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    cpf,
    email,
    avatar,
    avatar_url,
    state,
    city,
    isPolitician,
    occupation,
    created_at,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      cpf,
      email,
      avatar,
      avatar_url,
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
