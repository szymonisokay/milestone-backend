import { Configuration } from '@/entities/configuration.entity';
import { Transaction } from '@/shared/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type TransactionInput = string;
type TransactionOutput = Configuration;

@Injectable()
export class GetConfigurationTransaction extends Transaction<
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
    const configuration = await manager.findOneBy(Configuration, {
      user: { id: userId },
    });

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }

    return configuration;
  }
}
