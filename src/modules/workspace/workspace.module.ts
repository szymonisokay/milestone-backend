import { Module } from '@nestjs/common';

import { GetWorkspaceMembersTransaction } from '@/modules/workspace/transactions/get-workspace-members.transaction';

import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, GetWorkspaceMembersTransaction],
})
export class WorkspaceModule {}
