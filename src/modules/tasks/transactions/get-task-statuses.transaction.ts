import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TaskStatus } from '@/entities/task-status.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  workspaceId: string;
};
type TransactionOutput = TaskStatus[];

@Injectable()
export class GetTaskStatusesTransaction extends Transaction<
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
    const { workspaceId } = data;

    const query = manager
      .createQueryBuilder(TaskStatus, 'taskStatus')
      .where('taskStatus.workspaceId IS NULL')
      .orWhere('taskStatus.workspaceId = :workspaceId', { workspaceId });

    return query.getMany();
  }
}
