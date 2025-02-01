import { Injectable } from '@nestjs/common';

import { CreateSprintDto } from '@/modules/sprints/dto/create-sprint.dto';
import { GetSprintsDto } from '@/modules/sprints/dto/get-sprints.dto';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';
import { GetSprintsTransaction } from '@/modules/sprints/transactions/get-sprints.transaction';

@Injectable()
export class SprintsService {
  constructor(
    private readonly getSprintsTransaction: GetSprintsTransaction,
    private readonly createSprintTransaction: CreateSprintTransaction,
  ) {}

  async get(getSprintsDto: GetSprintsDto) {
    return this.getSprintsTransaction.run(getSprintsDto);
  }

  async create(createSprintDto: CreateSprintDto) {
    return this.createSprintTransaction.run(createSprintDto);
  }
}
