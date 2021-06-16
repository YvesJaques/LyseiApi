interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  cpf: string;
  email: string;
  state: string;
  city: string;
  isPolitician?: boolean;
  occupation?: string;
}

export { ICreateUserDTO };
