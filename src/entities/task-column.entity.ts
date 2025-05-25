import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { TaskStatus } from '@/entities/task-status.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class TaskColumn extends GlobalEntity {
  @Column({ type: 'varchar' })
  color: string;

  @OneToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  @JoinColumn({ name: 'statusId' })
  status: TaskStatus;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}
