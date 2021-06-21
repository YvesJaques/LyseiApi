import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePosts1623878532953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "solved",
            type: "boolean",
            default: false,
          },
          {
            name: "likes",
            type: "int",
            default: 0,
          },
          {
            name: "author_id",
            type: "uuid",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "number",
            type: "int",
          },
          {
            name: "picture",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "video",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "latitude",
            type: "float",
          },
          {
            name: "longitude",
            type: "float",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserPost",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["author_id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}
