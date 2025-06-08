import { Injectable } from '@nestjs/common';

import { CreateSprintDto } from '@/modules/sprints/dto/create-sprint.dto';
import { GetSprintsDto } from '@/modules/sprints/dto/get-sprints.dto';
import { UpdateSprintDto } from '@/modules/sprints/dto/update-sprint.dto';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';
import { GetActiveSprintTransaction } from '@/modules/sprints/transactions/get-active-sprint.transaction';
import { GetSprintsTransaction } from '@/modules/sprints/transactions/get-sprints.transaction';
import { UpdateSprintTransaction } from '@/modules/sprints/transactions/update-sprint.transaction';

@Injectable()
export class SprintsService {
  constructor(
    private readonly getSprintsTransaction: GetSprintsTransaction,
    private readonly createSprintTransaction: CreateSprintTransaction,
    private readonly updateSprintTransaction: UpdateSprintTransaction,
    private readonly getActiveSprintTransaction: GetActiveSprintTransaction,
  ) {}

  async get(getSprintsDto: GetSprintsDto) {
    return this.getSprintsTransaction.run(getSprintsDto);
  }

  async create(createSprintDto: CreateSprintDto) {
    return this.createSprintTransaction.run(createSprintDto);
  }

  async update(sprintId: string, updateSprintDto: UpdateSprintDto) {
    return this.updateSprintTransaction.run({ sprintId, updateSprintDto });
  }

  async getActiveSprint(projectId: string) {
    return this.getActiveSprintTransaction.run({ projectId });
  }
}
