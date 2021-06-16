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
      cpf: "33333333333",
      email: "teste@teste.com",
    };

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
      cpf: "33333333333",
      email: "teste@teste.com",
      isPolitician: true,
    };

    await createUserUseCase.execute(data);

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("cpf", data.cpf);
    expect(user).toHaveProperty("isPolitician", true);
  });

  it("Should not able to create a new user with an email already in use", async () => {
    await createUserUseCase.execute({
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
    });

    await expect(
      createUserUseCase.execute({
        name: "Test user2",
        password: "Test",
        cpf: "222222222",
        email: "teste@teste.com",
      }),
    ).rejects.toEqual(new AppError("User already exists!"));
  });

  it("Should not able to create a new user with a cpf already in use", async () => {
    await createUserUseCase.execute({
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
    });

    await expect(
      createUserUseCase.execute({
        name: "Test user2",
        password: "Test",
        cpf: "33333333333",
        email: "teste2@teste.com",
      }),
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});
