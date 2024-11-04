import { User } from '@/modules/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  teamId: string | null;

  @OneToOne(() => User, (user) => user.configuration)
  @JoinColumn()
  user: User;
}
