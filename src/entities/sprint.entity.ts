import { Column, Entity, OneToMany } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Sprint extends GlobalEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  goal: string;

  @Column({ type: 'timestamp without time zone' })
  startDate?: Date;

  @Column({ type: 'timestamp without time zone' })
  endDate?: Date;

  @OneToMany(() => Task, (task) => task.sprint)
  tasks: Task[];
}
