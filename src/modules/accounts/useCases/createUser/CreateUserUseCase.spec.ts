import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
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
      state: "AM",
      city: "Tacapé",
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
      state: "AM",
      city: "Tacapé",
      isPolitician: true,
      occupation: "Vereador",
    };

    await createUserUseCase.execute(data);

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("cpf", data.cpf);
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("state", data.state);
    expect(user).toHaveProperty("isPolitician", data.isPolitician);
    expect(user).toHaveProperty("occupation", data.occupation);
  });

  it("Should not be able to create a politician user with no occupation", async () => {
    const data = {
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
      state: "AM",
      city: "Tacapé",
      isPolitician: true,
    };

    await expect(createUserUseCase.execute(data)).rejects.toEqual(
      new AppError("Occupation not entered for politician user!"),
    );
  });

  it("Should not able to create a new user with an email already in use", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      cpf: "1111111111",
      password: "1234",
      name: "User Test",
      state: "AM",
      city: "Taquatinga",
    };

    await usersRepositoryInMemory.create(user);

    await expect(
      createUserUseCase.execute({
        name: "Test user2",
        password: "Test",
        cpf: "222222222",
        email: "teste@teste.com",
        state: "RS",
        city: "Porto Alegre",
      }),
    ).rejects.toEqual(new AppError("User already exists!"));
  });

  it("Should not able to create a new user with a cpf already in use", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      cpf: "33333333333",
      password: "1234",
      name: "User Test",
      state: "AM",
      city: "Taquatinga",
    };

    await usersRepositoryInMemory.create(user);

    await expect(
      createUserUseCase.execute({
        name: "Test user2",
        password: "Test",
        cpf: "33333333333",
        email: "teste2@teste.com",
        state: "Vvardenfell",
        city: "Balmora",
      }),
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});
