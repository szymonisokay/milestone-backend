import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Task } from '@/entities/task.entity';
import { User } from '@/entities/user.entity';
import { Workspace } from '@/entities/workspace.entity';
import { GlobalEntity } from '@/shared/global.entity';
import { MemberRoles } from '@/types/roles';

@Entity()
export class WorkspaceMember extends GlobalEntity {
  @PrimaryColumn('uuid')
  memberId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'memberId' })
  member: User;

  @PrimaryColumn('uuid')
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.id)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @Column({ type: 'enum', enum: MemberRoles, default: MemberRoles.MEMBER })
  role: MemberRoles;

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[];
}
