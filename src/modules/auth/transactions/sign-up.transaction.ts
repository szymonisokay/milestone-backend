import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { User } from '@/modules/auth/user.entity';
import { HashPasswordTransaction } from '@/modules/auth/utils/hash-password.transaction';
import { Transaction } from '@/shared/transaction';

type SignUpTransactionInput = SignUpDto;
type SignUpTransactionOutput = void;

@Injectable()
export class SignUpTransaction extends Transaction<
  SignUpTransactionInput,
  SignUpTransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly hashPasswordTransaction: HashPasswordTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: SignUpDto,
    manager: EntityManager,
  ): Promise<SignUpTransactionOutput> {
    const { email, password } = data;

    const userExists = await manager.existsBy(User, { email });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword =
      await this.hashPasswordTransaction.runWithinTransaction(
        password,
        manager,
      );

    const user = manager.create(User, { email, password: hashedPassword });

    await manager.save(user);
  }
}
