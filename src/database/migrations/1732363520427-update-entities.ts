import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1732363520427 implements MigrationInterface {
    name = 'UpdateEntities1732363520427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "projectWorkspaceId" character varying`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_7d8c9757a8bb40e5b8307ce4f19" FOREIGN KEY ("projectId", "projectWorkspaceId") REFERENCES "project"("id","workspaceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_7d8c9757a8bb40e5b8307ce4f19"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "projectWorkspaceId"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "projectId"`);
    }

}
