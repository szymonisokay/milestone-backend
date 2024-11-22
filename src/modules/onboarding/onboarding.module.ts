import { Module } from '@nestjs/common';

import { CreateAccountTransaction } from '@/modules/account/transactions/create-account.transaction';
import { UpdateConfigurationTransaction } from '@/modules/configuration/transactions/update-configuration.transaction';
import { OnboardingController } from '@/modules/onboarding/onboarding.controller';
import { OnboardingService } from '@/modules/onboarding/onboarding.service';
import { CreateWorkspaceTransaction } from '@/modules/onboarding/transactions/create-workspace.transaction';
import { UpdateDetailsTransaction } from '@/modules/onboarding/transactions/update-details.transaction';

@Module({
  controllers: [OnboardingController],
  providers: [
    OnboardingService,
    UpdateDetailsTransaction,
    CreateWorkspaceTransaction,
    CreateAccountTransaction,
    UpdateConfigurationTransaction,
  ],
})
export class OnboardingModule {}
