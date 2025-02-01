import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { Task } from '@/entities/task.entity';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
  userId: string;
  createTaskDto: CreateTaskDto;
};
type TransactionOutput = Task;

@Injectable()
export class CreateTaskTransaction extends Transaction<
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
    const { userId, sprintId, createTaskDto } = data;

    const sprintExists = await manager.existsBy(Sprint, {
      id: sprintId,
    });

    if (!sprintExists) {
      throw new NotFoundException('Sprint not found');
    }

    const identifier = await manager.count(Task);

    const task = manager.create(Task, {
      ...createTaskDto,
      identifier: `PR1-${identifier.toString().padStart(2, '0')}`,
      sprint: {
        id: sprintId,
      },
      creator: {
        id: userId,
      },
    });

    return await manager.save(task);
  }
}
