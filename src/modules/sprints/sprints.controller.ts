import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateSprintDto } from '@/modules/sprints/dto/create-sprint.dto';
import { SprintsService } from '@/modules/sprints/sprints.service';

@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Get(':projectId')
  async get(@Param('projectId') projectId: string) {
    return this.sprintsService.get({ projectId });
  }

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto);
  }
}
