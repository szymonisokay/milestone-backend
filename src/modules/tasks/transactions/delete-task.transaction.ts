import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
  taskId: string;
};
type TransactionOutput = void;

@Injectable()
export class DeleteTaskTransaction extends Transaction<
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
    const { sprintId, taskId } = data;

    const task = await manager.findOne(Task, {
      where: {
        id: taskId,
        sprint: {
          id: sprintId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await manager.softRemove(task);
  }
}
