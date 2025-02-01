import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { CreateTaskTransaction } from '@/modules/tasks/transactions/create-task.transaction';
import { UpdateTaskTransaction } from '@/modules/tasks/transactions/update-task.transaction';

@Injectable()
export class TasksService {
  constructor(
    private readonly createTaskTransaction: CreateTaskTransaction,
    private readonly updateTaskTransaction: UpdateTaskTransaction,
  ) {}

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
}
