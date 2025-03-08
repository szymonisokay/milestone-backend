import { Column, Entity, ManyToOne } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Task extends GlobalEntity {
  @Column({ type: 'varchar', unique: true })
  identifier: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint: Sprint;

  @ManyToOne(() => WorkspaceMember)
  creator: WorkspaceMember;

  @ManyToOne(() => WorkspaceMember, { nullable: true })
  assignee?: WorkspaceMember | null;
}
