interface IPostConclusionHistoryRepository {
  create(user_id: string, post_id: string, status: boolean): Promise<boolean>;
}

export { IPostConclusionHistoryRepository };
