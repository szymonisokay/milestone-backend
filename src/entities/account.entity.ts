import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from '@/entities/user.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Account extends GlobalEntity {
  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'userId' })
  user: User;
}
