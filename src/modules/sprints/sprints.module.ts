import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { SprintsController } from '@/modules/sprints/sprints.controller';
import { SprintsService } from '@/modules/sprints/sprints.service';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';
import { GetSprintsTransaction } from '@/modules/sprints/transactions/get-sprints.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [SprintsService, CreateSprintTransaction, GetSprintsTransaction],
})
export class SprintsModule {}
