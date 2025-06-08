import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sprint } from '@/entities/sprint.entity';
import { SprintsController } from '@/modules/sprints/sprints.controller';
import { SprintsService } from '@/modules/sprints/sprints.service';
import { CreateSprintTransaction } from '@/modules/sprints/transactions/create-sprint.transaction';
import { GetSprintsTransaction } from '@/modules/sprints/transactions/get-sprints.transaction';
import { UpdateSprintTransaction } from '@/modules/sprints/transactions/update-sprint.transaction';
import { TasksModule } from '@/modules/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), TasksModule],
  controllers: [SprintsController],
  providers: [
    SprintsService,
    CreateSprintTransaction,
    GetSprintsTransaction,
    UpdateSprintTransaction,
  ],
})
export class SprintsModule {}
