import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Account } from '@/modules/account/account.entity';
import { Transaction } from '@/shared/transaction';

type CreateAccountTransactionInput = string;
type CreateAccountTransactionOutput = Account;

@Injectable()
export class CreateAccountTransaction extends Transaction<
  CreateAccountTransactionInput,
  CreateAccountTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: CreateAccountTransactionInput,
    manager: EntityManager,
  ): Promise<CreateAccountTransactionOutput> {
    const account = manager.create(Account, { user: { id: userId } });

    return await manager.save(account);
  }
}
