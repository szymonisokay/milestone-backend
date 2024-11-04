import { Configuration } from '@/modules/configuration/configuration.entity';
import { Transaction } from '@/shared/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type GetConfigurationTransactionInput = string;
type GetConfigurationTransactionOutput = Configuration;

@Injectable()
export class GetConfigurationTransaction extends Transaction<
  GetConfigurationTransactionInput,
  GetConfigurationTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: GetConfigurationTransactionInput,
    manager: EntityManager,
  ): Promise<GetConfigurationTransactionOutput> {
    const configuration = await manager.findOneBy(Configuration, {
      user: { id: userId },
    });

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }

    return configuration;
  }
}
