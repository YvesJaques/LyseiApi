import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostImages1623950575605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts_images",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          {
            name: "post_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKPostImage",
            referencedTableName: "posts",
            referencedColumnNames: ["id"],
            columnNames: ["post_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts_images");
  }
}
