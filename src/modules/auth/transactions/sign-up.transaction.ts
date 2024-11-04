import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { CreateAccountTransaction } from '@/modules/account/transactions/create-account.transaction';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { hashPassword } from '@/modules/auth/utils/password-actions';
import { CreateConfigurationTransaction } from '@/modules/configuration/transactions/create-configuration.transaction';
import { User } from '@/modules/user/user.entity';
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
    private readonly createConfigurationTransaction: CreateConfigurationTransaction,
    private readonly createAccountTransaction: CreateAccountTransaction,
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

    const hashedPassword = await hashPassword(password);
    const user = manager.create(User, {
      email,
      password: hashedPassword,
    });

    await manager.save(user);

    await this.createAccountTransaction.runWithinTransaction(user.id, manager);
    await this.createConfigurationTransaction.runWithinTransaction(
      user.id,
      manager,
    );
  }
}
