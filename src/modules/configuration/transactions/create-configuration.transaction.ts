import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Configuration } from '@/modules/configuration/configuration.entity';
import { Transaction } from '@/shared/transaction';

type CreateConfigurationTransactionInput = string;
type CreateConfigurationTransactionOutput = Configuration;

@Injectable()
export class CreateConfigurationTransaction extends Transaction<
  CreateConfigurationTransactionInput,
  CreateConfigurationTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: CreateConfigurationTransactionInput,
    manager: EntityManager,
  ): Promise<CreateConfigurationTransactionOutput> {
    const configuration = manager.create(Configuration, {
      user: {
        id: userId,
      },
    });

    return await manager.save(configuration);
  }
}
