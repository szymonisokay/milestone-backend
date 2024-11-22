import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Configuration } from '@/entities/configuration.entity';
import { Project } from '@/entities/project.entity';
import { User } from '@/entities/user.entity';
import { AddProjectDto } from '@/modules/projects/dto/add-project.dto';
import { Transaction } from '@/shared/transaction';
import { DataSource, EntityManager } from 'typeorm';

type TransactionInput = {
  userId: string;
} & AddProjectDto;
type TransactionOutput = Project;

@Injectable()
export class AddProjectTransaction extends Transaction<
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
    const { userId, ...addProjectDto } = data;

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
        userId,
      },
    });

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }

    const projectSymbolExists = await manager.existsBy(Project, {
      symbol: addProjectDto.symbol,
      workspaceId: configuration.workspaceId ?? '',
    });

    if (projectSymbolExists) {
      throw new BadRequestException('Project with this symbol already exists');
    }

    const project = manager.create(Project, {
      ...addProjectDto,
      workspace: {
        id: configuration.workspaceId ?? '',
      },
    });

    return await manager.save(project);
  }
}
