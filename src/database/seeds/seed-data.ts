import { Account } from '@/modules/account/account.entity';
import { Configuration } from '@/modules/configuration/configuration.entity';
import { User } from '@/modules/user/user.entity';

type Entities = User | Configuration | Account;

type SeedData = {
  entity: () => Entities;
  data: Entities;
};

const userData: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'john.doe@gmail.com',
    password: '$2b$10$L7XdNxhVzrW5xTHna5aOdO2dnhvEol4eXIVkqFCf.kCLJGwJnH1pm', // 'Password!123'
    configuration: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Configuration,
    account: {
      id: '00000000-0000-0000-0000-000000000001',
    } as Account,
  },
];

export const seedData: SeedData[] = [];
