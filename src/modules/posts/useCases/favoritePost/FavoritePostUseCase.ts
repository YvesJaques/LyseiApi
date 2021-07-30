import { IPostFavoritesRepository } from "@modules/posts/repositories/IPostFavoritesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
class FavoritePostUseCase {
  constructor(
    @inject("PostFavoritesRepository")
    private postFavoritesRepository: IPostFavoritesRepository,
  ) {}

  async execute({ user_id, post_id }: IRequest): Promise<boolean> {
    const favoriteAlreadyExists =
      await this.postFavoritesRepository.findByUserIdAndPostId(
        user_id,
        post_id,
      );

    if (favoriteAlreadyExists) {
      this.postFavoritesRepository.deleteByUserIdAndPostId(user_id, post_id);
      return false;
    }
    this.postFavoritesRepository.create(user_id, post_id);
    return true;
  }
}

export { FavoritePostUseCase };
