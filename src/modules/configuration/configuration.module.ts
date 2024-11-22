import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration } from '@/entities/configuration.entity';
import { ConfigurationController } from '@/modules/configuration/configuration.controller';
import { ConfigurationService } from '@/modules/configuration/configuration.service';
import { CreateConfigurationTransaction } from '@/modules/configuration/transactions/create-configuration.transaction';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';
import { UpdateConfigurationTransaction } from '@/modules/configuration/transactions/update-configuration.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])],
  controllers: [ConfigurationController],
  providers: [
    ConfigurationService,
    GetConfigurationTransaction,
    CreateConfigurationTransaction,
    UpdateConfigurationTransaction,
  ],
})
export class ConfigurationModule {}
