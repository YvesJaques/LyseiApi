import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUserProfileUseCase: UpdateUserProfileUseCase;

describe("Update user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserProfileUseCase = new UpdateUserProfileUseCase(
      usersRepositoryInMemory,
    );
  });

  it("Should be able to update an user's profile", async () => {
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

    const newData = {
      id: usersRepositoryInMemory.users[0].id,
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
      state: "AM",
      city: "Tacapé",
      isPolitician: true,
      occupation: "Vereador",
    };

    await updateUserProfileUseCase.execute(newData);

    const user = await usersRepositoryInMemory.findByEmail("teste@teste.com");

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", newData.email);
    expect(user).toHaveProperty("cpf", newData.cpf);
    expect(user).toHaveProperty("email", newData.email);
    expect(user).toHaveProperty("state", newData.state);
    expect(user).toHaveProperty("isPolitician", newData.isPolitician);
    expect(user).toHaveProperty("occupation", newData.occupation);
  });
});
