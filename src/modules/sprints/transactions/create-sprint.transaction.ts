import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Not } from 'typeorm';

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

    const sprintName = await this.getSprintName(name, projectId, manager);

    const sprintExists = await manager.exists(Sprint, {
      where: {
        name: sprintName,
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
      name: sprintName,
      project: {
        id: projectId,
      },
    });

    return await manager.save(sprint);
  }

  private async getSprintName(
    name: string = '',
    projectId: string,
    manager: EntityManager,
  ) {
    if (name) {
      return name;
    }

    const sprintsCount = await manager.count(Sprint, {
      where: {
        name: Not('Backlog'),
        project: {
          id: projectId,
        },
      },
    });

    return `Sprint ${sprintsCount + 1}`;
  }
}
