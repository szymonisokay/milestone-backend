import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { SignInTransaction } from '@/modules/auth/transactions/sign-in.transaction';
import { SignUpTransaction } from '@/modules/auth/transactions/sign-up.transaction';
import { ComparePasswordTransaction } from '@/modules/auth/utils/compare-password.transaction';
import { GenerateTokenTransaction } from '@/modules/auth/utils/generate-token.transaction';
import { HashPasswordTransaction } from '@/modules/auth/utils/hash-password.transaction';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInTransaction,
    SignUpTransaction,
    HashPasswordTransaction,
    ComparePasswordTransaction,
    GenerateTokenTransaction,
  ],
})
export class AuthModule {}
