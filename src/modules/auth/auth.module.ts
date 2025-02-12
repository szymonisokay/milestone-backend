import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { SignInTransaction } from '@/modules/auth/transactions/sign-in.transaction';
import { SignUpTransaction } from '@/modules/auth/transactions/sign-up.transaction';
import { CreateConfigurationTransaction } from '@/modules/configuration/transactions/create-configuration.transaction';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInTransaction,
    SignUpTransaction,
    CreateConfigurationTransaction,
  ],
})
export class AuthModule {}
