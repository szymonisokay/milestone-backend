import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from '@/entities/project.entity';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { ProjectController } from '@/modules/projects/projects.controller';
import { ProjectService } from '@/modules/projects/projects.service';
import { CreateProjectTransaction } from '@/modules/projects/transactions/create-project.transaction';
import { GetProjectTransaction } from '@/modules/projects/transactions/get-project.transaction';
import { GetProjectsTransaction } from '@/modules/projects/transactions/get-projects.transaction';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    CreateProjectTransaction,
    GetProjectsTransaction,
    GetProjectTransaction,
    GetConfigurationTransaction,
    CreateSprintTransaction,
  ],
})
export class ProjectModule {}
