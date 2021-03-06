import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let profileUserUseCase: ProfileUserUseCase;

describe("Get user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to retrieve an user's profile", async () => {
    const data = {
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
      state: "AM",
      city: "Tacapé",
      isPolitician: true,
      occupation: "President",
    };

    await usersRepositoryInMemory.create(data);

    const profile = await profileUserUseCase.execute(
      usersRepositoryInMemory.users[0].id,
    );

    expect(profile).toHaveProperty("email", data.email);
    expect(profile).toHaveProperty("cpf", data.cpf);
    expect(profile).toHaveProperty("email", data.email);
    expect(profile).toHaveProperty("state", data.state);
    expect(profile).toHaveProperty("isPolitician", data.isPolitician);
    expect(profile).toHaveProperty("occupation", data.occupation);
  });

  it("Should not be able to retrieve an unexistent user's profile", async () => {
    await expect(profileUserUseCase.execute("1")).rejects.toEqual(
      new AppError("User does not exist!"),
    );
  });
});
