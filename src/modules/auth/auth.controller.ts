import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@/modules/auth/auth.service';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignInDto) {
    return this.authService.signUp(signUpDto);
  }
}
