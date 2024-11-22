import { Column, Entity, ManyToOne } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Task extends GlobalEntity {
  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'varchar' })
  description?: string;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks)
  sprint: Sprint;

  @ManyToOne(() => WorkspaceMember, (member) => member.tasks)
  creator: WorkspaceMember;

  @ManyToOne(() => WorkspaceMember, (member) => member.tasks, {
    nullable: true,
  })
  assignee?: WorkspaceMember;
}
