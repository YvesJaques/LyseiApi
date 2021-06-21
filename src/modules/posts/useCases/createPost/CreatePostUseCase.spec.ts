import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { CreatePostUseCase } from "./CreatePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createPostUseCase: CreatePostUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;

describe("Create post", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
  });

  it("Should be able to create a new post", async () => {
    const user = {
      name: "Test user",
      password: "Test",
      cpf: "33333333333",
      email: "teste@teste.com",
      state: "AM",
      city: "Tacapé",
      isPolitician: true,
      occupation: "Vereador",
    };

    await usersRepositoryInMemory.create(user);

    const user_id = usersRepositoryInMemory.users[0].id;

    const data = {
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
    };

    await createPostUseCase.execute(data);

    const post_id = postsRepositoryInMemory.posts[0].id;

    const post = await postsRepositoryInMemory.findById(post_id);

    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title", data.title);
    expect(post).toHaveProperty("description", data.description);
  });
});
