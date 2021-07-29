import auth from "@config/auth";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;

describe("Refresh Token", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("Should be able to return a refresh token", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      cpf: "1111111111",
      password: await hash("1234", 8),
      name: "User Test",
      state: "AM",
      city: "Taquatinga",
    };

    await usersRepositoryInMemory.create(user);
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const user_id = usersRepositoryInMemory.users[0].id;

    const refresh_token_expires_date = dateProvider.addDays(
      expires_refresh_token_days,
    );

    const refresh_token = sign({ email: user.email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    await usersTokensRepositoryInMemory.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const result = await refreshTokenUseCase.execute(
      usersTokensRepositoryInMemory.usersTokens[0].refresh_token,
    );

    expect(result).toHaveProperty("refresh_token");
  });

  it("Should not be able to return a refresh token when provided with a non existent refresh token", async () => {
    await expect(
      refreshTokenUseCase.execute(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJpYXQiOjE2Mjc1ODc5NjgsImV4cCI6MTYyNzU5NTE2OCwic3ViIjoiODQ3NjQ1ZjMtYTc1My00ZGYxLWI2MDUtNTFhNDg0YmY3ZDVlIn0.7VU7kDJ87QVyZp38vVcTFySosx8V3_etu5aM82ZlNeA",
      ),
    ).rejects.toEqual(new AppError("Refresh Token does not exist!"));
  });
});
