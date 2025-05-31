import { Injectable } from '@nestjs/common';

import { GetWorkspaceMembersTransaction } from '@/modules/workspace/transactions/get-workspace-members.transaction';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly getWorkspaceMembersTransaction: GetWorkspaceMembersTransaction,
  ) {}

  getWorkspaceMembers(workspaceId: string) {
    return this.getWorkspaceMembersTransaction.run({
      workspaceId,
    });
  }
}
