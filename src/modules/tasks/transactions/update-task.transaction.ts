import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Task } from '@/entities/task.entity';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
  updateTaskDto: UpdateTaskDto;
};
type TransactionOutput = Task;

@Injectable()
export class UpdateTaskTransaction extends Transaction<
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
    const { sprintId, updateTaskDto } = data;
    const { taskId } = updateTaskDto;

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

    const preloadedTask = await manager.preload(Task, {
      id: taskId,
      ...updateTaskDto,
    });

    if (!preloadedTask) {
      throw new NotFoundException('Task not found');
    }

    return await manager.save(preloadedTask);
  }
}
