import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CheckEmailAvailabilityUseCase } from "./CheckEmailAvailabilityUseCase";

let checkEmailAvailabilityUseCase: CheckEmailAvailabilityUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Check email availability", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    checkEmailAvailabilityUseCase = new CheckEmailAvailabilityUseCase(
      usersRepositoryInMemory,
    );
  });

  it("Should be able to check if an email is available", async () => {
    const email = "teste@teste.com";

    const response = await checkEmailAvailabilityUseCase.execute(email);

    expect(response).toBe(undefined);
  });

  it("Should be able to check if an email is unavailable", async () => {
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
      checkEmailAvailabilityUseCase.execute("teste@teste.com"),
    ).rejects.toEqual(new AppError("Email already in use!"));
  });
});
