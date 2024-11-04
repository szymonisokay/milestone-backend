import { Module } from '@nestjs/common';

import { ConfigurationController } from '@/modules/configuration/configuration.controller';
import { ConfigurationService } from '@/modules/configuration/configuration.service';
import { CreateConfigurationTransaction } from '@/modules/configuration/transactions/create-configuration.transaction';
import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';

@Module({
  controllers: [ConfigurationController],
  providers: [
    ConfigurationService,
    GetConfigurationTransaction,
    CreateConfigurationTransaction,
  ],
})
export class ConfigurationModule {}
