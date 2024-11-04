import { User } from '@/modules/user/user.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      user: Omit<User, 'password'>;
    }
  }
}
