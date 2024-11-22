import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1732311955018 implements MigrationInterface {
    name = 'UpdateEntities1732311955018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "goal" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "sprintId" uuid, "creatorId" uuid, "creatorMemberId" character varying, "creatorWorkspaceId" character varying, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying, "lastName" character varying, "userId" uuid NOT NULL, CONSTRAINT "PK_0bee8fa4a9078fc38b613557464" PRIMARY KEY ("id", "userId"))`);
        await queryRunner.query(`CREATE TABLE "configuration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workspaceId" character varying, "userId" uuid NOT NULL, CONSTRAINT "PK_435ef2e3e69847b50bf3471156c" PRIMARY KEY ("id", "userId"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "symbol" character varying(3) NOT NULL, "description" character varying NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "UQ_db7dd4fd79923b1749161cfd84b" UNIQUE ("symbol"), CONSTRAINT "PK_e7dfb4c672bc4815bbc5884f93d" PRIMARY KEY ("id", "workspaceId"))`);
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."workspace_member_role_enum" AS ENUM('admin', 'developer', 'member')`);
        await queryRunner.query(`CREATE TABLE "workspace_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "memberId" uuid NOT NULL, "workspaceId" uuid NOT NULL, "role" "public"."workspace_member_role_enum" NOT NULL DEFAULT 'member', CONSTRAINT "PK_8f4f70b2cc8d91921ec807557ea" PRIMARY KEY ("id", "memberId", "workspaceId"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e84a1a4a3e2209a8939ed71c8ec" FOREIGN KEY ("creatorId", "creatorMemberId", "creatorWorkspaceId") REFERENCES "workspace_member"("id","memberId","workspaceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "configuration" ADD CONSTRAINT "FK_7dc8b524d927a3e5de85601e7bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_c224ab17df530651e53a398ed92" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_51f2194e4a415202512807d2f63" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_4a31620f281e5e6a53ec1fb4663" FOREIGN KEY ("memberId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede"`);
        await queryRunner.query(`ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_4a31620f281e5e6a53ec1fb4663"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_51f2194e4a415202512807d2f63"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_c224ab17df530651e53a398ed92"`);
        await queryRunner.query(`ALTER TABLE "configuration" DROP CONSTRAINT "FK_7dc8b524d927a3e5de85601e7bb"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e84a1a4a3e2209a8939ed71c8ec"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`);
        await queryRunner.query(`DROP TABLE "workspace_member"`);
        await queryRunner.query(`DROP TYPE "public"."workspace_member_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "configuration"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "sprint"`);
    }

}
