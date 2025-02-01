import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateProjectDto } from '@/modules/projects/dto/create-project.dto';
import { ProjectService } from '@/modules/projects/projects.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(
    @ActiveUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.createProject(user.id, createProjectDto);
  }

  @Get()
  getProjects(@ActiveUser() user: User) {
    return this.projectService.getProjects(user.id);
  }

  @Get(':symbol')
  getProject(@ActiveUser() user: User, @Param('symbol') symbol: string) {
    return this.projectService.getProject(user.id, symbol);
  }
}
