import { User } from '@/modules/auth/user.entity';

type Entities = User;

type SeedData = {
  entity: () => Entities;
  data: Entities;
};

const userData: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'john.doe@gmail.com',
    password: '$2b$10$L7XdNxhVzrW5xTHna5aOdO2dnhvEol4eXIVkqFCf.kCLJGwJnH1pm', // 'Password!123'
  },
];

export const seedData: SeedData[] = [];
