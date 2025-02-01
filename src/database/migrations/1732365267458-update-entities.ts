import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1732365267458 implements MigrationInterface {
    name = 'UpdateEntities1732365267458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "startDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "endDate" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "startDate" TIMESTAMP NOT NULL`);
    }

}
