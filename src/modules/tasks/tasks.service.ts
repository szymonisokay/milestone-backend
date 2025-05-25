import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { CreateTaskTransaction } from '@/modules/tasks/transactions/create-task.transaction';
import { DeleteTaskTransaction } from '@/modules/tasks/transactions/delete-task.transaction';
import { GetTaskStatusesTransaction } from '@/modules/tasks/transactions/get-task-statuses.transaction';
import { GetTaskTransaction } from '@/modules/tasks/transactions/get-task.transaction';
import { GetTasksTransaction } from '@/modules/tasks/transactions/get-tasks.transaction';
import { UpdateTaskTransaction } from '@/modules/tasks/transactions/update-task.transaction';

@Injectable()
export class TasksService {
  constructor(
    private readonly getTaskTransaction: GetTaskTransaction,
    private readonly getTasksTransaction: GetTasksTransaction,
    private readonly createTaskTransaction: CreateTaskTransaction,
    private readonly updateTaskTransaction: UpdateTaskTransaction,
    private readonly deleteTaskTransaction: DeleteTaskTransaction,
    private readonly getTaskStatusesTransaction: GetTaskStatusesTransaction,
  ) {}

  async getTasks(sprintId: string) {
    return this.getTasksTransaction.run({ sprintId });
  }

  async getTask(sprintId: string, taskId: string) {
    return this.getTaskTransaction.run({ sprintId, taskId });
  }

  async createTask(
    sprintId: string,
    userId: string,
    createTaskDto: CreateTaskDto,
  ) {
    return this.createTaskTransaction.run({
      sprintId,
      userId,
      createTaskDto,
    });
  }

  async updateTask(
    sprintId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    return this.updateTaskTransaction.run({
      sprintId,
      taskId,
      updateTaskDto,
    });
  }

  async deleteTask(sprintId: string, taskId: string) {
    return this.deleteTaskTransaction.run({ sprintId, taskId });
  }

  async getTaskStatuses(workspaceId: string) {
    return this.getTaskStatusesTransaction.run({ workspaceId });
  }
}
