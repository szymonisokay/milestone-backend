import { NestFactory } from '@nestjs/core';

import { SeedsModule } from '@/database/seeds/seeds.module';
import { SeedsService } from '@/database/seeds/seeds.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedsModule);

  await app.get(SeedsService).run();
  await app.close();
};

void runSeed();
