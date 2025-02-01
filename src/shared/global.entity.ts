import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false, nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', select: false, nullable: true })
  deletedAt: Date | null;
}
