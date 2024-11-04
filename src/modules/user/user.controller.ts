import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/modules/user/user.entity';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUser(@ActiveUser() user: User) {
    return user;
  }
}
