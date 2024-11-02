import { Transaction } from '@/shared/transaction';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type ClearDBTransaction_Params = void;
type ClearDBTransaction_Response = void;

@Injectable()
export class ClearDBTransaction extends Transaction<
  ClearDBTransaction_Params,
  ClearDBTransaction_Response
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    _: ClearDBTransaction_Params,
    manager: EntityManager,
  ): Promise<ClearDBTransaction_Response> {
    await manager.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  }
}
