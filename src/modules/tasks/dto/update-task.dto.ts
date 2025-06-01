import { TaskStatus } from '@/entities/task-status.entity';

export class UpdateTaskDto {
  name?: string;
  description?: string;
  assigneeId?: string;
  status?: TaskStatus;
}
