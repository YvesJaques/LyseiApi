import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { hash } from "bcrypt";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      cpf: "1111111111",
      password: await hash("1234", 8),
      name: "User Test",
      state: "AM",
      city: "Taquatinga",
    };

    await usersRepositoryInMemory.create(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: "1234",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user ", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      }),
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("Should not be able to authenticate an user with an incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      cpf: "1111111111",
      password: await hash("1234", 8),
      name: "User Test",
      state: "AM",
      city: "Taquatinga",
    };

    await usersRepositoryInMemory.create(user);

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongPassword",
      }),
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
