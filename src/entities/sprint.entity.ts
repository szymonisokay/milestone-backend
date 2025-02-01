import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { Task } from '@/entities/task.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Sprint extends GlobalEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  goal?: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project;
}
