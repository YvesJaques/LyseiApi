interface IUserResponseDTO {
  name: string;
  cpf: string;
  email: string;
  avatar: string;
  state: string;
  city: string;
  isPolitician: boolean;
  occupation: string;
  created_at: Date;
}

export { IUserResponseDTO };
