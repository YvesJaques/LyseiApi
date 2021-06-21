import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePostConclusionHistory1624105874383
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts_conclusions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "post_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "status",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "posts_conclusions",
      new TableForeignKey({
        name: "FKUserPost",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "posts_conclusions",
      new TableForeignKey({
        name: "FKPostUser",
        referencedTableName: "posts",
        referencedColumnNames: ["id"],
        columnNames: ["post_id"],
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts_conclusions");
  }
}
