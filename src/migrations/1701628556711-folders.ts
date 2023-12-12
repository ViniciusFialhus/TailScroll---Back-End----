import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Folders1701628556711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "folders",
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
            isNullable: true,
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "folders",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("folders");
  }
}
