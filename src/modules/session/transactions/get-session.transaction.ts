import { UnauthorizedException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/entities/user.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = string;
type TransactionOutput = User;

export class GetSessionTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const user = await manager.findOne(User, {
      where: { id: userId },
      select: ['id', 'email'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
