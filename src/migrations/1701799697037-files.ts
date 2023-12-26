import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Files1701799697037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "files",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "name",
            type: "text",
            isNullable: true,
          },
          {
            name: "type",
            type: "text",
          },
          {
            name: "path",
            type: "text",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "folder_id",
            type: "int",
            isNullable: true
          }
        ],
      })
    );
    await queryRunner.createForeignKey(
      "files",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
        "files",
        new TableForeignKey({
          columnNames: ["folder_id"],
          referencedTableName: "folders",
          referencedColumnNames: ["id"],
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("files");
  }
}
