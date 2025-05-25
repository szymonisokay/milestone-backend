import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultStatuses1748175693992 implements MigrationInterface {
  name = 'AddDefaultStatuses1748175693992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "task_status" 
      ("id", "name", "isCustom", "workspaceId", "createdAt", "updatedAt") 
      VALUES 
      ('00000000-0000-0000-0000-000000000001', 'To Do', false, null, now(), now()),
      ('00000000-0000-0000-0000-000000000002', 'In Progress', false, null, now(), now()),
      ('00000000-0000-0000-0000-000000000003', 'Testing', false, null, now(), now()),
      ('00000000-0000-0000-0000-000000000004', 'Completed', false, null, now(), now()),
      ('00000000-0000-0000-0000-000000000005', 'Blocked', false, null, now(), now())
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "task_status" WHERE "id" IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005')`,
    );
  }
}
