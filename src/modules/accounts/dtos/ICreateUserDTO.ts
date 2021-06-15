interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  cpf: number;
  email: string;  
  occupation?: string;  
  isPolitician?: boolean
}

export { ICreateUserDTO };
