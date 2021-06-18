interface IUpdateUserDTO {
  id: string;
  name: string;
  cpf: string;
  email: string;
  state: string;
  city: string;
  isPolitician: boolean;
  occupation: string;
}

export { IUpdateUserDTO };
