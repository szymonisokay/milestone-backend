import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { User } from '@/modules/auth/user.entity';
import { ComparePasswordTransaction } from '@/modules/auth/utils/compare-password.transaction';
import { GenerateTokenTransaction } from '@/modules/auth/utils/generate-token.transaction';
import { Transaction } from '@/shared/transaction';

type SignInTransactionInput = SignInDto;
type SignInTransactionOutput = string;

@Injectable()
export class SignInTransaction extends Transaction<
  SignInTransactionInput,
  SignInTransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly comparePasswordTransaction: ComparePasswordTransaction,
    private readonly generateTokenTransaction: GenerateTokenTransaction,
  ) {
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

    const passwordMatch =
      await this.comparePasswordTransaction.runWithinTransaction(
        {
          password,
          hashedPassword: user.password,
        },
        manager,
      );

    if (!passwordMatch) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const token = await this.generateTokenTransaction.runWithinTransaction(
      {
        userId: user.id,
        expiresIn: rememberMe ? '30d' : '1d',
      },
      manager,
    );

    return token;
  }
}
