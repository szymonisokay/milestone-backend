import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
};
type TransactionOutput = Task[];

@Injectable()
export class GetTasksTransaction extends Transaction<
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
    const { sprintId } = data;

    const tasks = await manager.find(Task, {
      where: {
        sprint: {
          id: sprintId,
        },
      },
    });

    return tasks;
  }
}
