import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateSprintDto } from '@/modules/sprints/dto/create-sprint.dto';
import { UpdateSprintDto } from '@/modules/sprints/dto/update-sprint.dto';
import { SprintsService } from '@/modules/sprints/sprints.service';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';
import { TasksService } from '@/modules/tasks/tasks.service';

@Controller('sprints')
export class SprintsController {
  constructor(
    private readonly sprintsService: SprintsService,
    private readonly tasksService: TasksService,
  ) {}

  @Get(':projectId')
  async get(@Param('projectId') projectId: string) {
    return this.sprintsService.get({ projectId });
  }

  @Get(':projectId/active')
  async getActiveSprint(@Param('projectId') projectId: string) {
    return this.sprintsService.getActiveSprint(projectId);
  }

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto);
  }

  @Put(':sprintId')
  async update(
    @Param('sprintId') sprintId: string,
    @Body() updateSprintDto: UpdateSprintDto,
  ) {
    return this.sprintsService.update(sprintId, updateSprintDto);
  }

  @Get(':sprintId/tasks')
  async getTasks(@Param('sprintId') sprintId: string) {
    return this.tasksService.getTasks(sprintId);
  }

  @Get(':sprintId/tasks/:taskId')
  async getTask(
    @Param('sprintId') sprintId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.getTask(sprintId, taskId);
  }

  @Post(':sprintId/tasks')
  async createTask(
    @Param('sprintId') sprintId: string,
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() user: User,
  ) {
    return this.tasksService.createTask(sprintId, user.id, createTaskDto);
  }

  @Put(':sprintId/tasks/:taskId')
  updateTask(
    @Param('sprintId') sprintId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(sprintId, taskId, updateTaskDto);
  }

  @Delete(':sprintId/tasks/:taskId')
  deleteTask(
    @Param('sprintId') sprintId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.deleteTask(sprintId, taskId);
  }

  @Get('tasks/status')
  getTaskStatuses(@Query('workspaceId') workspaceId: string) {
    return this.tasksService.getTaskStatuses(workspaceId);
  }
}
