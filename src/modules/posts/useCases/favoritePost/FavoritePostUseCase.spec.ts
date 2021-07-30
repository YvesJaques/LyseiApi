import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { PostFavoritesRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostFavoritesRepositoryInMemory";
import { PostsRepositoryInMemory } from "@modules/posts/repositories/in-memory/PostsRepositoryInMemory";

import { FavoritePostUseCase } from "./FavoritePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let postFavoritesRepositoryInMemory: PostFavoritesRepositoryInMemory;
let favoritePostUseCase: FavoritePostUseCase;

describe("Favorite a post", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    postsRepositoryInMemory = new PostsRepositoryInMemory();
    postFavoritesRepositoryInMemory = new PostFavoritesRepositoryInMemory();
    favoritePostUseCase = new FavoritePostUseCase(
      postFavoritesRepositoryInMemory,
    );
  });

  it("Should be able to mark a post as favorite", async () => {
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

    postsRepositoryInMemory.create(data);

    const post_id = postsRepositoryInMemory.posts[0].id;

    await favoritePostUseCase.execute({ user_id, post_id });

    expect(postFavoritesRepositoryInMemory.postFavorites[0].user_id).toEqual(
      user_id,
    );
    expect(postFavoritesRepositoryInMemory.postFavorites[0].post_id).toEqual(
      post_id,
    );
  });

  it("Should be able to unmark a post as favorite", async () => {
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

    postsRepositoryInMemory.create(data);

    const post_id = postsRepositoryInMemory.posts[0].id;

    await favoritePostUseCase.execute({ user_id, post_id });
    await favoritePostUseCase.execute({ user_id, post_id });

    expect(postFavoritesRepositoryInMemory.postFavorites.length).toEqual(0);
  });
});
