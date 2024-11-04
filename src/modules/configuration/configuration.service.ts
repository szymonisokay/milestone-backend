import { Injectable } from '@nestjs/common';

import { GetConfigurationTransaction } from '@/modules/configuration/transactions/get-configuration.transaction';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly getConfigurationTransaction: GetConfigurationTransaction,
  ) {}

  async getConfiguration(userId: string) {
    return this.getConfigurationTransaction.run(userId);
  }
}
