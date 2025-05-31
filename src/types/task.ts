import { Task } from '@/entities/task.entity';
import { WorkspaceMemberResponse } from '@/types/workspace';

export type TaskResponse = Omit<Task, 'assignee' | 'creator'> & {
  assignee: WorkspaceMemberResponse | null;
  creator: WorkspaceMemberResponse;
};
