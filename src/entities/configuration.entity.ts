import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from '@/entities/user.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity()
export class Configuration extends GlobalEntity {
  @Column({ type: 'uuid', nullable: true, default: null })
  workspaceId: string | null;

  @OneToOne(() => User, (user) => user.configuration)
  @JoinColumn({ name: 'userId' })
  user: User;
}
