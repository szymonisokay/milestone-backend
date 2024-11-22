import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Account } from '@/entities/account.entity';
import { UpdateAccountDto } from '@/modules/account/dto/update-account.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
} & UpdateAccountDto;
type TransactionOutput = Account;

@Injectable()
export class UpdateAccountTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { userId, ...userData } = data;

    const account = await manager.findOne(Account, {
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const preloadedAccount = (await manager.preload(Account, {
      ...account,
      ...userData,
    })) as Account;

    return await manager.save(preloadedAccount);
  }
}
