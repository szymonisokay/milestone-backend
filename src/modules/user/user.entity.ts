import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from '@/modules/account/account.entity';
import { Configuration } from '@/modules/configuration/configuration.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Configuration, (configuration) => configuration.user)
  configuration: Configuration;

  @OneToOne(() => Account, (account) => account.user)
  account: Account;
}
