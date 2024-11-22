import { Injectable } from '@nestjs/common';

import { GetActiveUserTransaction } from '@/modules/user/transactions/get-active-user.transaction';

@Injectable()
export class UserService {
  constructor(
    private readonly getActiveUserTransaction: GetActiveUserTransaction,
  ) {}

  async getActiveUser(userId: string) {
    return this.getActiveUserTransaction.run(userId);
  }
}
