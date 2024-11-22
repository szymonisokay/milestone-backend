import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1731104677011 implements MigrationInterface {
    name = 'Setup1731104677011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying(3) NOT NULL, "description" character varying NOT NULL, "workspaceId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_db7dd4fd79923b1749161cfd84b" UNIQUE ("symbol"), CONSTRAINT "PK_e7dfb4c672bc4815bbc5884f93d" PRIMARY KEY ("id", "workspaceId"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_c224ab17df530651e53a398ed92" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_c224ab17df530651e53a398ed92"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
