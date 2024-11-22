import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { User } from '@/entities/user.entity';
import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Workspace extends GlobalEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.workspaces)
  owner: User;

  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  members: WorkspaceMember[];

  @OneToMany(() => Project, (project) => project.workspace)
  projects: Project[];
}
