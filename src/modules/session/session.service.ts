import { GetSessionTransaction } from '@/modules/session/transactions/get-session.transaction';
import { User } from '@/modules/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(private readonly getSessionTransaction: GetSessionTransaction) {}

  getSession(user: User) {
    return this.getSessionTransaction.run(user.id);
  }
}
