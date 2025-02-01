import { Injectable } from '@nestjs/common';

import { CreateProjectDto } from '@/modules/projects/dto/create-project.dto';
import { CreateProjectTransaction } from '@/modules/projects/transactions/create-project.transaction';
import { GetProjectTransaction } from '@/modules/projects/transactions/get-project.transaction';
import { GetProjectsTransaction } from '@/modules/projects/transactions/get-projects.transaction';

@Injectable()
export class ProjectService {
  constructor(
    private readonly createProjectTransaction: CreateProjectTransaction,
    private readonly getProjectsTransaction: GetProjectsTransaction,
    private readonly getProjectTransaction: GetProjectTransaction,
  ) {}

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    return this.createProjectTransaction.run({ ...createProjectDto, userId });
  }

  async getProjects(userId: string) {
    return this.getProjectsTransaction.run({ userId });
  }

  async getProject(userId: string, symbol: string) {
    return this.getProjectTransaction.run({ userId, symbol });
  }
}
