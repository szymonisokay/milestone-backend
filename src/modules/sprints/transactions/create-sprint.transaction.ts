import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { CreateSprintDto } from '@/modules/sprints/dto/create-sprint.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = CreateSprintDto;
type TransactionOutput = Sprint;

@Injectable()
export class CreateSprintTransaction extends Transaction<
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
    const { name, projectId, ...sprintData } = data;

    const sprintExists = await manager.exists(Sprint, {
      where: {
        name,
        project: {
          id: projectId,
        },
      },
    });

    if (sprintExists) {
      throw new Error('Sprint with this name already exists');
    }

    const sprint = manager.create(Sprint, {
      ...sprintData,
      name,
      project: {
        id: projectId,
      },
    });

    return await manager.save(sprint);
  }
}
