import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const data = {
      name: "Test user",      
      password: "Test",
      cpf: 33333333333,
      email: "teste@teste.com"
    }
     
    await createUserUseCase.execute(data);

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");
    
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("cpf", data.cpf);
  });

  it("Should be able to create a new politician user", async () => {
    const data = {
      name: "Test user",      
      password: "Test",
      cpf: 33333333333,
      email: "teste@teste.com",
      isPolitician: true
    }
     
    await createUserUseCase.execute(data);

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");
    
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("cpf", data.cpf);
    expect(user).toHaveProperty("isPolitician", true);
  });
  
});
