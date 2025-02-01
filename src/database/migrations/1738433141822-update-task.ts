import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTask1738433141822 implements MigrationInterface {
    name = 'UpdateTask1738433141822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "name" SET NOT NULL`);
    }

}
