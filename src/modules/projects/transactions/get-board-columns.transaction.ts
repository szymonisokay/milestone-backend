import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TaskColumn } from '@/entities/task-column.entity';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  projectId: string;
};
type TransactionOutput = TaskColumn[];

@Injectable()
export class GetBoardColumnsTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly getConfigurationTransaction: GetConfigurationTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { projectId } = data;

    const boardColumns = await manager.find(TaskColumn, {
      where: {
        project: {
          id: projectId,
        },
      },
      relations: ['status'],
    });

    return boardColumns;
  }
}
