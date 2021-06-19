interface IUpdateUserDTO {
  id: string;
  name: string;
  cpf: string;
  email: string;
  avatar: string;
  state: string;
  city: string;
  isPolitician: boolean;
  occupation: string;
}

export { IUpdateUserDTO };
