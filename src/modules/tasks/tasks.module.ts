import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from '@/entities/task.entity';
import { TasksController } from '@/modules/tasks/tasks.controller';
import { TasksService } from '@/modules/tasks/tasks.service';
import { CreateTaskTransaction } from '@/modules/tasks/transactions/create-task.transaction';
import { DeleteTaskTransaction } from '@/modules/tasks/transactions/delete-task.transaction';
import { GetTaskTransaction } from '@/modules/tasks/transactions/get-task.transaction';
import { UpdateTaskTransaction } from '@/modules/tasks/transactions/update-task.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    GetTaskTransaction,
    CreateTaskTransaction,
    UpdateTaskTransaction,
    DeleteTaskTransaction,
  ],
})
export class TasksModule {}
