import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Configuration } from '@/entities/configuration.entity';
import { Project } from '@/entities/project.entity';
import { User } from '@/entities/user.entity';
import { CreateProjectDto } from '@/modules/projects/dto/create-project.dto';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
} & CreateProjectDto;
type TransactionOutput = Project;

@Injectable()
export class CreateProjectTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly createSprintTransaction: CreateSprintTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { userId, ...createProjectDto } = data;

    const user = await manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const configuration = await manager.findOne(Configuration, {
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }

    if (!configuration.workspaceId) {
      throw new NotFoundException('Workspace not found');
    }

    const projectSymbolExists = await manager.existsBy(Project, {
      symbol: createProjectDto.symbol,
      workspace: {
        id: configuration.workspaceId,
      },
    });

    if (projectSymbolExists) {
      throw new BadRequestException('Project with this symbol already exists');
    }

    const project = manager.create(Project, {
      ...createProjectDto,
      workspace: {
        id: configuration.workspaceId,
      },
    });

    const createdProject = await manager.save(project);

    await this.createBacklog(createdProject.id, manager);

    return createdProject;
  }

  private async createBacklog(projectId: string, manager: EntityManager) {
    return this.createSprintTransaction.runWithinTransaction(
      {
        name: 'Backlog',
        projectId,
      },
      manager,
    );
  }
}
