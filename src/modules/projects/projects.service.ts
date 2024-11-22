import { Injectable } from '@nestjs/common';

import { AddProjectDto } from '@/modules/projects/dto/add-project.dto';
import { AddProjectTransaction } from '@/modules/projects/transactions/add-project.transaction';
import { GetProjectTransaction } from '@/modules/projects/transactions/get-project.transaction';
import { GetProjectsTransaction } from '@/modules/projects/transactions/get-projects.transaction';

@Injectable()
export class ProjectService {
  constructor(
    private readonly addProjectTransaction: AddProjectTransaction,
    private readonly getProjectsTransaction: GetProjectsTransaction,
    private readonly getProjectTransaction: GetProjectTransaction,
  ) {}

  async addProject(userId: string, addProjectDto: AddProjectDto) {
    return this.addProjectTransaction.run({ ...addProjectDto, userId });
  }

  async getProjects(userId: string) {
    return this.getProjectsTransaction.run({ userId });
  }

  async getProject(userId: string, symbol: string) {
    return this.getProjectTransaction.run({ userId, symbol });
  }
}
