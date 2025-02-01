import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Not } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { GetSprintsDto } from '@/modules/sprints/dto/get-sprints.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = GetSprintsDto;
type TransactionOutput = Sprint[];

@Injectable()
export class GetSprintsTransaction extends Transaction<
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
    const { projectId } = data;

    const backlog = await manager.findOne(Sprint, {
      where: {
        name: 'Backlog',
        isCompleted: false,
        project: {
          id: projectId,
        },
      },
      relations: [
        'tasks',
        'tasks.creator',
        'tasks.creator.member',
        'tasks.assignee',
      ],
    });

    if (!backlog) {
      throw new NotFoundException('Backlog not found');
    }

    const sprints = await manager.find(Sprint, {
      where: {
        name: Not('Backlog'),
        isActive: false,
        isCompleted: false,
        project: {
          id: projectId,
        },
      },
      relations: ['tasks', 'tasks.creator', 'tasks.assignee'],
    });

    return [...sprints, backlog];
  }
}
