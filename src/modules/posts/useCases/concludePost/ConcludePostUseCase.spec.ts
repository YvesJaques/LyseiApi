import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { PostConclusionHistoryRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostConclusionHistoryRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { ConcludePostUseCase } from "./ConcludePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;

let concludePostUseCase: ConcludePostUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let postConclusionHistoryRepositoryInMemory: PostConclusionHistoryRepositoryInMemory;

describe("Conclude post", () => {
  beforeEach(() => {
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    postConclusionHistoryRepositoryInMemory =
      new PostConclusionHistoryRepositoryInMemory();
    concludePostUseCase = new ConcludePostUseCase(
      postConclusionHistoryRepositoryInMemory,
      postsRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("Should be able to conclude a post ", async () => {
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

    await postsRepositoryInMemory.create({
      author_id: user_id,
      title: "Escola em decadência",
      description: "Escola antiga em decadência",
      state: "AM",
      city: "Taubaté",
      district: "Centro",
      street: "Rua do Acampamento",
      number: 900,
      latitude: 56.3,
      longitude: 10043.7,
    });

    const post_id = postsRepositoryInMemory.posts[0].id;

    await concludePostUseCase.execute({ user_id, post_id });

    const post = await postsRepositoryInMemory.findById(post_id);

    expect(post).toHaveProperty("solved", true);
  });
});
