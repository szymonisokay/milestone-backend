import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  projectId: string;
};
type TransactionOutput = Sprint | null;

@Injectable()
export class GetActiveSprintTransaction extends Transaction<
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

    const activeSprint = await manager.findOne(Sprint, {
      where: {
        isActive: true,
        project: {
          id: projectId,
        },
      },
    });

    if (!activeSprint) {
      return null;
    }

    return activeSprint;
  }
}
