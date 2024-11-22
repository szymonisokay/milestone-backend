import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { User } from '@/entities/user.entity';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
  symbol: string;
};
type TransactionOutput = Project;

@Injectable()
export class GetProjectTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly getConfigurationTransaction: GetConfigurationTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { userId, symbol } = data;

    const user = await manager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const configuration =
      await this.getConfigurationTransaction.runWithinTransaction(
        userId,
        manager,
      );

    if (!configuration.workspaceId) {
      throw new UnauthorizedException('Workspace not found');
    }

    const project = await manager.findOne(Project, {
      where: {
        symbol,
        workspace: {
          id: configuration.workspaceId,
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
