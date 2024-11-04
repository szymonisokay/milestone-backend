import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { DatabaseConfigService } from '@/database/database-config.service';
import { MiddlewareModule } from '@/middleware/middleware.module';
import { UserMiddleware } from '@/middleware/user.middleware';
import { AccountModule } from '@/modules/account/account.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigurationModule } from '@/modules/configuration/configuration.module';
import { SessionModule } from '@/modules/session/session.module';
import { UserModule } from '@/modules/user/user.module';

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
    MiddlewareModule,
    AuthModule,
    SessionModule,
    UserModule,
    AccountModule,
    ConfigurationModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
