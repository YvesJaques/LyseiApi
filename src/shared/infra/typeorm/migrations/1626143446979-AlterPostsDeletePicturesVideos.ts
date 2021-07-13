import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterPostsDeletePicturesVideos1626143446979
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("posts", "picture");
    await queryRunner.dropColumn("posts", "video");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "posts",
      new TableColumn({
        name: "picture",
        type: "varchar",
      }),
    );
    await queryRunner.addColumn(
      "posts",
      new TableColumn({
        name: "video",
        type: "varchar",
      }),
    );
  }
}
