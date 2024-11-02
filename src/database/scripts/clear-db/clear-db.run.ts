import { NestFactory } from '@nestjs/core';

import { ClearDBTransaction } from '@/database/scripts/clear-db/clear-db.script';
import { DBScriptsModule } from '@/database/scripts/db-scripts.module';

const runScript = async () => {
  const app = await NestFactory.create(DBScriptsModule);
  await app.get(ClearDBTransaction).run();
  await app.close();
};

void runScript();
