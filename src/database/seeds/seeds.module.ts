import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { DatabaseConfigService } from '@/database/database-config.service';
import { SeedsService } from '@/database/seeds/seeds.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: [
        '.env',
        '.env.local',
        '.env.production',
        '.env.development',
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
  providers: [SeedsService],
})
export class SeedsModule {}
