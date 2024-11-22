import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { AddProjectDto } from '@/modules/projects/dto/add-project.dto';
import { ProjectService } from '@/modules/projects/projects.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  addProject(@ActiveUser() user: User, @Body() addProjectDto: AddProjectDto) {
    return this.projectService.addProject(user.id, addProjectDto);
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
