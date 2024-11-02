import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.getOrThrow('database.type'),
      url: this.configService.getOrThrow('database.url'),
      synchronize: false,
      dropSchema: false,
      logging: false,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
    } as TypeOrmModuleOptions;
  }
}
