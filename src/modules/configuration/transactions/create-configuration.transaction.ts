import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Configuration } from '@/entities/configuration.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = string;
type TransactionOutput = Configuration;

@Injectable()
export class CreateConfigurationTransaction extends Transaction<
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
    const configuration = manager.create(Configuration, {
      user: {
        id: userId,
      },
    });

    return await manager.save(configuration);
  }
}
