import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntities1732311805876 implements MigrationInterface {
  name = 'UpdateEntities1732311805876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "goal" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "sprintId" uuid, "creatorId" uuid, "creatorMemberId" character varying, "creatorWorkspaceId" character varying, "assigneeId" uuid, "assigneeMemberId" character varying, "assigneeWorkspaceId" character varying, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "PK_14624fed830c4ccd7093e98e1cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "PK_8f4f70b2cc8d91921ec807557ea" PRIMARY KEY ("memberId", "workspaceId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e84a1a4a3e2209a8939ed71c8ec" FOREIGN KEY ("creatorId", "creatorMemberId", "creatorWorkspaceId") REFERENCES "workspace_member"("id","memberId","workspaceId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_ed42b70d12cbb7920d91a71bcce" FOREIGN KEY ("assigneeId", "assigneeMemberId", "assigneeWorkspaceId") REFERENCES "workspace_member"("id","memberId","workspaceId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_ed42b70d12cbb7920d91a71bcce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_e84a1a4a3e2209a8939ed71c8ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "PK_8f4f70b2cc8d91921ec807557ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "PK_14624fed830c4ccd7093e98e1cd" PRIMARY KEY ("memberId", "workspaceId")`,
    );
    await queryRunner.query(`ALTER TABLE "workspace_member" DROP COLUMN "id"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "sprint"`);
  }
}
