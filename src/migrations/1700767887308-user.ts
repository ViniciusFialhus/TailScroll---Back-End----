import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1700767887308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = new Table({
            name:"user",
            columns: [
				{
					name: 'id',
					type: 'serial',
					isPrimary: true,
				},
				{
					name: 'name',
					type: 'text',
					isNullable: true,
				},
				{
					name: 'email',
					type: 'text',
					isUnique: true,
				},
				{
					name: 'password',
					type: 'text',
				},
			],
            
        })
        await queryRunner.createTable(user)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
