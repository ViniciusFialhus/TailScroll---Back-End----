import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class RpgSystems1701625112705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       const rpg_systems = new Table({
            name: "rpg_systems",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ]
        })
        await queryRunner.createTable(rpg_systems)
        await queryRunner.query(
            "INSERT INTO rpg_systems (name) VALUES ('Mutantes & Masterminds'), ('Dungeons and Dragons 5e')"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable('rpg_systems');
            console.log('Table "rpg_systems" dropped successfully.');
        } catch (error) {
            console.error('Error dropping table "rpg_systems":', error);
        }
    }

}
