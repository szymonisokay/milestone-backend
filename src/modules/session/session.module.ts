import { Module } from '@nestjs/common';

import { SessionController } from '@/modules/session/session.controller';
import { SessionService } from '@/modules/session/session.service';
import { GetSessionTransaction } from '@/modules/session/transactions/get-session.transaction';

@Module({
  controllers: [SessionController],
  providers: [SessionService, GetSessionTransaction],
})
export class SessionModule {}
