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

export { ICreateUserDTO };
