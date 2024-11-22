import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@/entities/account.entity';
import { CreateAccountTransaction } from '@/modules/account/transactions/create-account.transaction';
import { UpdateAccountTransaction } from '@/modules/account/transactions/update-account.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [CreateAccountTransaction, UpdateAccountTransaction],
})
export class AccountModule {}
