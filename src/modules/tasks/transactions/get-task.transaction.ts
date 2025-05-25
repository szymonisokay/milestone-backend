import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
  taskId: string;
};
type TransactionOutput = Task;

@Injectable()
export class GetTaskTransaction extends Transaction<
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
      relations: [
        'creator',
        'creator.member',
        'creator.member.account',
        'assignee',
        'assignee.member',
        'assignee.member.account',
        'status',
      ],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
