import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { CreateTaskTransaction } from '@/modules/tasks/transactions/create-task.transaction';
import { DeleteTaskTransaction } from '@/modules/tasks/transactions/delete-task.transaction';
import { GetTaskTransaction } from '@/modules/tasks/transactions/get-task.transaction';
import { UpdateTaskTransaction } from '@/modules/tasks/transactions/update-task.transaction';

@Injectable()
export class TasksService {
  constructor(
    private readonly getTaskTransaction: GetTaskTransaction,
    private readonly createTaskTransaction: CreateTaskTransaction,
    private readonly updateTaskTransaction: UpdateTaskTransaction,
    private readonly deleteTaskTransaction: DeleteTaskTransaction,
  ) {}

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

  async updateTask(sprintId: string, updateTaskDto: UpdateTaskDto) {
    return this.updateTaskTransaction.run({
      sprintId,
      updateTaskDto,
    });
  }

  async deleteTask(sprintId: string, taskId: string) {
    return this.deleteTaskTransaction.run({ sprintId, taskId });
  }
}
