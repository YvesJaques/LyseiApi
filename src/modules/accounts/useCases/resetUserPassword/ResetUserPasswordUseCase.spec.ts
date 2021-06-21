import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let resetUserPasswordUseCase: ResetUserPasswordUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Reset user password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    resetUserPasswordUseCase = new ResetUserPasswordUseCase(
      usersRepositoryInMemory,
    );
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("Should be able to update an user's password", async () => {
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

    await resetUserPasswordUseCase.execute(
      usersRepositoryInMemory.users[0].id,
      "1234",
    );

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: "1234",
    });

    expect(result).toHaveProperty("token");
  });
});
