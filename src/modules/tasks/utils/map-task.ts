import { Task } from '@/entities/task.entity';
import { mapWorkspaceMember } from '@/modules/workspace/workspace.utils';

export const mapTask = (task: Task) => ({
  ...task,
  assignee: task.assignee ? mapWorkspaceMember(task.assignee) : null,
  creator: mapWorkspaceMember(task.creator),
});
