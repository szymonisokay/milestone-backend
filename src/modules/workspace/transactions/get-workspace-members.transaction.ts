import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { WorkspaceMember } from '@/entities/workspace-member.entity';
import { mapWorkspaceMember } from '@/modules/workspace/workspace.utils';
import { Transaction } from '@/shared/transaction';
import { WorkspaceMemberResponse } from '@/types/workspace';

type TransactionInput = {
  workspaceId: string;
};
type TransactionOutput = WorkspaceMemberResponse[];

@Injectable()
export class GetWorkspaceMembersTransaction extends Transaction<
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
    const { workspaceId } = data;

    const workspaceMembers = await manager.find(WorkspaceMember, {
      where: {
        workspace: {
          id: workspaceId,
        },
      },
      relations: ['member', 'member.account'],
    });

    return workspaceMembers.map(mapWorkspaceMember);
  }
}
