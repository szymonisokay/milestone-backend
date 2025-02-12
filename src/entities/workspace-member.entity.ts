import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { User } from '@/entities/user.entity';
import { Workspace } from '@/entities/workspace.entity';
import { GlobalEntity } from '@/shared/global.entity';
import { MemberRoles } from '@/types/roles';

@Entity()
export class WorkspaceMember extends GlobalEntity {
  @ManyToOne(() => User, (user) => user.id)
  member: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.id)
  workspace: Workspace;

  @Column({ type: 'enum', enum: MemberRoles, default: MemberRoles.MEMBER })
  role: MemberRoles;

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[];
}
