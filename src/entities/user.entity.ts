import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { Account } from '@/entities/account.entity';
import { Configuration } from '@/entities/configuration.entity';
import { Workspace } from '@/entities/workspace.entity';
import { GlobalEntity } from '@/shared/global.entity';

@Entity('user')
export class User extends GlobalEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Configuration, (configuration) => configuration.user)
  configuration: Configuration;

  @OneToOne(() => Account, (account) => account.user)
  account: Account;

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  workspaces: Workspace[];
}
