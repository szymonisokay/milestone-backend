import { Column, Entity, ManyToOne } from 'typeorm';

import { Workspace } from '@/entities/workspace.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class TaskStatus extends GlobalEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: true })
  isCustom: boolean;

  @ManyToOne(() => Workspace, (workspace) => workspace.id, { nullable: true })
  workspace: Workspace | null;
}
