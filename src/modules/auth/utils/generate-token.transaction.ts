import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';

import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
  expiresIn: string | number;
};
type TransactionOutput = string;

@Injectable()
export class GenerateTokenTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(data: TransactionInput): Promise<TransactionOutput> {
    const { userId, expiresIn } = data;

    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn });
  }
}
