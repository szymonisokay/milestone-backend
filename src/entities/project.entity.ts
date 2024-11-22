import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @PrimaryColumn()
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;
}
