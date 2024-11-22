import { User } from '@/entities/user.entity';
import { Transaction } from '@/shared/transaction';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type TransactionInput = string;
type TransactionOutput = User;

@Injectable()
export class GetActiveUserTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    userId: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const user = await manager.findOne(User, {
      where: {
        id: userId,
      },
      relations: ['account'],
      select: ['id', 'email'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
