import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager, Not } from 'typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { UpdateSprintDto } from '@/modules/sprints/dto/update-sprint.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  sprintId: string;
  updateSprintDto: UpdateSprintDto;
};
type TransactionOutput = Sprint;

@Injectable()
export class UpdateSprintTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { sprintId, updateSprintDto } = data;

    const sprint = await manager.findOne(Sprint, {
      where: {
        id: sprintId,
      },
    });

    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    if (updateSprintDto.isActive) {
      const isOtherSprintActive = await manager.exists(Sprint, {
        where: {
          id: Not(sprintId),
          isActive: true,
        },
      });

      if (isOtherSprintActive) {
        throw new BadRequestException('Only one sprint can be active');
      }
    }

    const preloadedSprint = await manager.preload(Sprint, {
      id: sprintId,
      ...updateSprintDto,
    });

    if (!preloadedSprint) {
      throw new NotFoundException('Sprint not found');
    }

    return await manager.save(preloadedSprint);
  }
}
