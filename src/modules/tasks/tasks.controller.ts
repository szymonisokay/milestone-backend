import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { TasksService } from '@/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':sprintId')
  create(
    @Param('sprintId') sprintId: string,
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() user: User,
  ) {
    return this.tasksService.createTask(sprintId, user.id, createTaskDto);
  }

  @Patch(':sprintId')
  update(
    @Param('sprintId') sprintId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(sprintId, updateTaskDto);
  }
}
