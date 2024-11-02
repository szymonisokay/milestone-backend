import { Injectable } from '@nestjs/common';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { SignInTransaction } from '@/modules/auth/transactions/sign-in.transaction';
import { SignUpTransaction } from '@/modules/auth/transactions/sign-up.transaction';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInTransaction: SignInTransaction,
    private readonly signUpTransaction: SignUpTransaction,
  ) {}

  async signIn(signInDto: SignInDto) {
    return this.signInTransaction.run(signInDto);
  }

  async signUp(signUpDto: SignUpDto) {
    return this.signUpTransaction.run(signUpDto);
  }
}
