import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Transaction } from '@/shared/transaction';
import { DataSource } from 'typeorm';

type ComparePasswordTransactionInput = {
  password: string;
  hashedPassword: string;
};

type ComparePasswordTransactionOutput = boolean;

@Injectable()
export class ComparePasswordTransaction extends Transaction<
  ComparePasswordTransactionInput,
  ComparePasswordTransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute({
    password,
    hashedPassword,
  }: ComparePasswordTransactionInput): Promise<ComparePasswordTransactionOutput> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
