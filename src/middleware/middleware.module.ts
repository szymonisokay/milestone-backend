import { Module } from '@nestjs/common';

import { UserMiddleware } from '@/middleware/user.middleware';

@Module({
  providers: [UserMiddleware],
})
export class MiddlewareModule {}
