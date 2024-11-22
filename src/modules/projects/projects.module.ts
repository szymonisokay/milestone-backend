import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from '@/entities/project.entity';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { ProjectController } from '@/modules/projects/projects.controller';
import { ProjectService } from '@/modules/projects/projects.service';
import { AddProjectTransaction } from '@/modules/projects/transactions/add-project.transaction';
import { GetProjectTransaction } from '@/modules/projects/transactions/get-project.transaction';
import { GetProjectsTransaction } from '@/modules/projects/transactions/get-projects.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    AddProjectTransaction,
    GetProjectsTransaction,
    GetProjectTransaction,
    GetConfigurationTransaction,
  ],
})
export class ProjectModule {}
