import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { Sprint } from '@/entities/sprint.entity';
import { Task } from '@/entities/task.entity';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { createIdentifier } from '@/modules/tasks/utils/create-identifier';
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

    const project = await manager.findOne(Project, {
      where: {
        sprints: {
          id: sprintId,
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const taskCount = await manager.count(Task, { withDeleted: true });
    const identifier = createIdentifier(taskCount, project.symbol);

    const task = manager.create(Task, {
      ...createTaskDto,
      identifier,
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
