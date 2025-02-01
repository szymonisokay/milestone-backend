import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { Workspace } from '@/entities/workspace.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Project extends GlobalEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 3 })
  symbol: string;

  @Column({ type: 'varchar' })
  description?: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  workspace: Workspace;

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];
}
