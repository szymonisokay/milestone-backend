import { Account } from '@/entities/account.entity';

export type WorkspaceMemberResponse = {
  id: string;
  email: string;
  account: Account;
};
