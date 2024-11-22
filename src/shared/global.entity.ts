import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp without time zone', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone', select: false })
  deletedAt: Date;
}
