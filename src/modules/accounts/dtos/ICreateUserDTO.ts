interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  cpf: string;
  email: string;
  occupation?: string;
  isPolitician?: boolean;
}

export { ICreateUserDTO };
