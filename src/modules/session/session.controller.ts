import { Controller, Get } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { SessionService } from '@/modules/session/session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getSession(@ActiveUser() user: User) {
    return this.sessionService.getSession(user);
  }
}
