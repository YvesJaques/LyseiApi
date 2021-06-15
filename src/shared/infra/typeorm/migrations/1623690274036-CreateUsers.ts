import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1623690274036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "int",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "occupation",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isPolitician",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
