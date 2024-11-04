import { UnauthorizedException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/modules/user/user.entity';
import { Transaction } from '@/shared/transaction';

type GetSessionTransactionInput = string;
type GetSessionTransactionOutput = User;

export class GetSessionTransaction extends Transaction<
  GetSessionTransactionInput,
  GetSessionTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: GetSessionTransactionInput,
    manager: EntityManager,
  ): Promise<GetSessionTransactionOutput> {
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
