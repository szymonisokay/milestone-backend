import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTask1738433283785 implements MigrationInterface {
    name = 'UpdateTask1738433283785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_b2c5b08af6c89f30ee37cea174a" UNIQUE ("identifier")`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_b2c5b08af6c89f30ee37cea174a"`);
    }

}
