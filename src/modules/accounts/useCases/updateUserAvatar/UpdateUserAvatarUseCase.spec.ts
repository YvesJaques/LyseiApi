import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let storageProvider: LocalStorageProvider;

describe("Update user avatar", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    storageProvider = new LocalStorageProvider();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepositoryInMemory,
      storageProvider,
    );
  });

  it("Should be able to update an user's avatar", async () => {
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

    await usersRepositoryInMemory.create(data);

    const user_id = usersRepositoryInMemory.users[0].id;

    const avatar_file = `${process.cwd()}/src/modules/accounts/useCases/updateUserAvatar/test.jpeg`;

    await updateUserAvatarUseCase.execute({ user_id, avatar_file });

    expect(usersRepositoryInMemory.users[0].avatar).not.toEqual("");
  });
});
