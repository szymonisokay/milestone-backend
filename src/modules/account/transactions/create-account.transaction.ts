import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Account } from '@/entities/account.entity';
import { CreateAccountDto } from '@/modules/account/dto/create-account.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = CreateAccountDto;
type TransactionOutput = Account;

@Injectable()
export class CreateAccountTransaction extends Transaction<
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
    const account = manager.create(Account, data);

    return await manager.save(account);
  }
}
