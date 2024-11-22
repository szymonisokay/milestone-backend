import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/entities/user.entity';
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto';
import { hashPassword } from '@/modules/auth/utils/password-actions';
import { CreateConfigurationTransaction } from '@/modules/configuration/transactions/create-configuration.transaction';
import { Transaction } from '@/shared/transaction';

type TransactionInput = SignUpDto;
type TransactionOutput = void;

@Injectable()
export class SignUpTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly createConfigurationTransaction: CreateConfigurationTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
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

    await this.createConfigurationTransaction.runWithinTransaction(
      user.id,
      manager,
    );
  }
}
