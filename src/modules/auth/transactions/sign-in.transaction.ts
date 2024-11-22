import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/entities/user.entity';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { generateToken } from '@/modules/auth/utils/jwt-actions';
import { comparePassword } from '@/modules/auth/utils/password-actions';
import { Transaction } from '@/shared/transaction';

type TransactionInput = SignInDto;
type TransactionOutput = string;

@Injectable()
export class SignInTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
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
