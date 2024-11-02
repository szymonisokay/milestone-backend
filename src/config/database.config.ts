import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  logging: true,
  synchronize: false,
}));
