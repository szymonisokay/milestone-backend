import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/entities/user.entity';
import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { Workspace } from '@/entities/workspace.entity';
import { UpdateConfigurationTransaction } from '@/modules/configuration/transactions/update-configuration.transaction';
import { CreateWorkspaceDto } from '@/modules/onboarding/dto/create-workspace.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
} & CreateWorkspaceDto;
type TransactionOutput = void;

@Injectable()
export class CreateWorkspaceTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly updateConfigurationTransaction: UpdateConfigurationTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { userId, name } = data;

    const user = await manager.findOne(User, {
      where: { id: userId },
      relations: ['configuration'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const workspace = manager.create(Workspace, {
      name,
      owner: {
        id: userId,
      },
    });

    await manager.save(workspace);

    const workspaceMember = manager.create(WorkspaceMember, {
      member: {
        id: userId,
      },
      workspace: { id: workspace.id },
    });

    await manager.save(workspaceMember);

    await this.updateConfigurationTransaction.runWithinTransaction(
      {
        id: user.configuration.id,
        workspaceId: workspace.id,
        userId,
      },
      manager,
    );
  }
}
