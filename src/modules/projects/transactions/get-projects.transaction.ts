import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Project } from '@/entities/project.entity';
import { User } from '@/entities/user.entity';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
};
type TransactionOutput = Project[];

@Injectable()
export class GetProjectsTransaction extends Transaction<
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
    const { userId } = data;

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

    const projects = await manager.find(Project, {
      where: {
        workspace: {
          id: configuration.workspaceId,
        },
      },
    });

    return projects;
  }
}
