import { Configuration } from '@/entities/configuration.entity';
import { UpdateConfigurationDto } from '@/modules/configuration/dto/update-configuration.dto';
import { Transaction } from '@/shared/transaction';
import { NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type TransactionInput = {
  id: string;
  userId: string;
} & UpdateConfigurationDto;
type TransactionOutput = Configuration;

export class UpdateConfigurationTransaction extends Transaction<
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
    const configuration = await manager.preload(Configuration, data);

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }

    return await manager.save(configuration);
  }
}
