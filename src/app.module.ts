import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { DatabaseConfigService } from '@/database/database-config.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
