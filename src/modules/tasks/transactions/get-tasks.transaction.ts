import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { mapTask } from '@/modules/tasks/utils/map-task';
import { Transaction } from '@/shared/transaction';
import { TaskResponse } from '@/types/task';

type TransactionInput = {
  sprintId: string;
};
type TransactionOutput = TaskResponse[];

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
      relations: [
        'creator',
        'creator.member',
        'creator.member.account',
        'assignee',
        'assignee.member',
        'assignee.member.account',
        'status',
      ],
      order: {
        createdAt: 'ASC',
      },
    });

    return tasks.map(mapTask);
  }
}
