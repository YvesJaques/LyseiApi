import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PostConclusionHistoryRepository } from "@modules/posts/infra/typeorm/repositories/PostConclusionHistoryRepository";
import { PostFavoritesRepository } from "@modules/posts/infra/typeorm/repositories/PostFavoritesRepository";
import { PostLikesRepository } from "@modules/posts/infra/typeorm/repositories/PostLikesRepository";
import { PostsImagesRepository } from "@modules/posts/infra/typeorm/repositories/PostsImagesRepository";
import { PostsRepository } from "@modules/posts/infra/typeorm/repositories/PostsRepository";
import { IPostConclusionHistoryRepository } from "@modules/posts/repositories/IPostConclusionHistory";
import { IPostFavoritesRepository } from "@modules/posts/repositories/IPostFavoritesRepository";
import { IPostLikesRepository } from "@modules/posts/repositories/IPostLikesRepository";
import { IPostsImagesRepository } from "@modules/posts/repositories/IPostsImagesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository,
);

container.registerSingleton<IPostsImagesRepository>(
  "PostsImagesRepository",
  PostsImagesRepository,
);

container.registerSingleton<IPostLikesRepository>(
  "PostLikesRepository",
  PostLikesRepository,
);

container.registerSingleton<IPostConclusionHistoryRepository>(
  "PostConclusionHistoryRepository",
  PostConclusionHistoryRepository,
);

container.registerSingleton<IPostFavoritesRepository>(
  "PostFavoritesRepository",
  PostFavoritesRepository,
);
