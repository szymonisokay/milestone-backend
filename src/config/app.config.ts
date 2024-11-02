import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  docs: 'docs',
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
}));
