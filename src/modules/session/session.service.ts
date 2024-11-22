import { User } from '@/entities/user.entity';
import { GetSessionTransaction } from '@/modules/session/transactions/get-session.transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(private readonly getSessionTransaction: GetSessionTransaction) {}

  getSession(user: User) {
    return this.getSessionTransaction.run(user.id);
  }
}
