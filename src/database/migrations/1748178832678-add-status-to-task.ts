import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToTask1748178832678 implements MigrationInterface {
  name = 'AddStatusToTask1748178832678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "statusId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "statusId"`);
  }
}
