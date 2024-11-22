import { Controller, Get } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { UserService } from '@/modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@ActiveUser() user: User) {
    return this.userService.getActiveUser(user.id);
  }
}
