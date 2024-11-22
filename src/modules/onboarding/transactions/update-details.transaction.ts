import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { User } from '@/entities/user.entity';
import { CreateAccountTransaction } from '@/modules/account/transactions/create-account.transaction';
import { UpdateDetailsDto } from '@/modules/onboarding/dto/update-details.dto';
import { Transaction } from '@/shared/transaction';

type TransactionInput = {
  userId: string;
} & UpdateDetailsDto;
type TransactionOutput = void;

@Injectable()
export class UpdateDetailsTransaction extends Transaction<
  TransactionInput,
  TransactionOutput
> {
  constructor(
    dataSource: DataSource,
    private readonly createAccountTransaction: CreateAccountTransaction,
  ) {
    super(dataSource);
  }

  protected async execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    const { userId, ...userData } = data;

    const user = await manager.findOne(User, {
      where: { id: userId },
      relations: ['configuration'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.createAccountTransaction.runWithinTransaction(
      {
        ...userData,
        userId,
      },
      manager,
    );

    // const team = manager.create(Team, {
    //   name: teamName,
    //   owner: {
    //     id: userId,
    //   },
    // });

    // await manager.save(team);

    // const teamMember = manager.create(TeamMember, {
    //   member: { id: userId },
    //   team: { id: team.id },
    // });

    // await manager.save(teamMember);

    // await this.updateConfigurationTransaction.runWithinTransaction(
    //   {
    //     id: user.configuration.id,
    //     teamId: team.id,
    //     userId,
    //   },
    //   manager,
    // );
  }
}
