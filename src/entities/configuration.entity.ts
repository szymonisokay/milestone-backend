import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from '@/entities/user.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Configuration extends GlobalEntity {
  @Column({ type: 'varchar', nullable: true, default: null })
  workspaceId: string | null;

  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, (user) => user.configuration)
  @JoinColumn({ name: 'userId' })
  user: User;
}
