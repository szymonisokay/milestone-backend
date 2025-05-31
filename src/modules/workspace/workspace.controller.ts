import { Controller, Get, Param } from '@nestjs/common';

import { WorkspaceService } from '@/modules/workspace/workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('/:workspaceId/members')
  getWorkspaceMembers(@Param('workspaceId') workspaceId: string) {
    return this.workspaceService.getWorkspaceMembers(workspaceId);
  }
}
