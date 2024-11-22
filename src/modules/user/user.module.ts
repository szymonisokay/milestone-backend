import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/entities/user.entity';
import { GetActiveUserTransaction } from '@/modules/user/transactions/get-active-user.transaction';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, GetActiveUserTransaction],
})
export class UserModule {}
