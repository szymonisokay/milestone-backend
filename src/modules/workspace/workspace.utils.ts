import { WorkspaceMember } from '@/entities/workspace-member.entity';

export const mapWorkspaceMember = (workspaceMember: WorkspaceMember) => ({
  id: workspaceMember.id,
  email: workspaceMember.member.email,
  account: workspaceMember.member.account,
});
