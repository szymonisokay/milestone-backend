import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1732312034841 implements MigrationInterface {
    name = 'UpdateEntities1732312034841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "assigneeId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "assigneeMemberId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "assigneeWorkspaceId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_ed42b70d12cbb7920d91a71bcce" FOREIGN KEY ("assigneeId", "assigneeMemberId", "assigneeWorkspaceId") REFERENCES "workspace_member"("id","memberId","workspaceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_ed42b70d12cbb7920d91a71bcce"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeWorkspaceId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeMemberId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeId"`);
    }

}
