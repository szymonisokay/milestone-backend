import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { Transaction } from '@/shared/transaction';

type HashPasswordTransactionInput = string;
type HashPasswordTransactionOutput = string;

@Injectable()
export class HashPasswordTransaction extends Transaction<
  HashPasswordTransactionInput,
  HashPasswordTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    password: string,
  ): Promise<HashPasswordTransactionOutput> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }
}
