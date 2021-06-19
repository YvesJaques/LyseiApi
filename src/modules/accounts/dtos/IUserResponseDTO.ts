interface IUserResponseDTO {
  name: string;
  cpf: string;
  email: string;
  avatar_url(): string;
  state: string;
  city: string;
  isPolitician: boolean;
  occupation: string;
  created_at: Date;
}

export { IUserResponseDTO };
