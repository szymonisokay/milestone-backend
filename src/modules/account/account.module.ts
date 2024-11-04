import { Module } from '@nestjs/common';

import { CreateAccountTransaction } from '@/modules/account/transactions/create-account.transaction';

@Module({
  providers: [CreateAccountTransaction],
})
export class AccountModule {}
