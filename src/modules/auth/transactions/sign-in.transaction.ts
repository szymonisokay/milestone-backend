import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { generateToken } from '@/modules/auth/utils/jwt-actions';
import { comparePassword } from '@/modules/auth/utils/password-actions';
import { User } from '@/modules/user/user.entity';
import { Transaction } from '@/shared/transaction';

type SignInTransactionInput = SignInDto;
type SignInTransactionOutput = string;

@Injectable()
export class SignInTransaction extends Transaction<
  SignInTransactionInput,
  SignInTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: SignInDto,
    manager: EntityManager,
  ): Promise<SignInTransactionOutput> {
    const { email, password, rememberMe } = data;

    const user = await manager.findOneBy(User, { email });

    if (!user) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const token = generateToken(user.id, rememberMe ? '30d' : '1d');

    return token;
  }
}
