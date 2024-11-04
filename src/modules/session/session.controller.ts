import { Controller, Get } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { SessionService } from '@/modules/session/session.service';
import { User } from '@/modules/user/user.entity';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getSession(@ActiveUser() user: User) {
    return this.sessionService.getSession(user);
  }
}
