import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { seedData } from '@/database/seeds/seeds-data';
import { Transaction } from '@/shared/transaction';

@Injectable()
export class SeedsService extends Transaction<void, void> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  private readonly logger = new Logger(SeedsService.name);

  protected async execute(data: void, manager: EntityManager): Promise<void> {
    for (const { entity, data } of seedData) {
      this.logger.log(`Seeding ${entity.name}...`);

      const dataExists = await manager.exists(entity);

      if (dataExists) {
        throw this.logger.error(
          `Cannot seed ${entity.name} because it already exists`,
        );
      }

      for (const item of data) {
        const createdItem = manager.create(entity, item);

        await manager.save(createdItem);
      }
    }
  }
}
