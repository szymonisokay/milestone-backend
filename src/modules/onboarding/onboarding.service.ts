import { CreateWorkspaceDto } from '@/modules/onboarding/dto/create-workspace.dto';
import { UpdateDetailsDto } from '@/modules/onboarding/dto/update-details.dto';
import { CreateWorkspaceTransaction } from '@/modules/onboarding/transactions/create-workspace.transaction';
import { UpdateDetailsTransaction } from '@/modules/onboarding/transactions/update-details.transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly updateDetailsTransaction: UpdateDetailsTransaction,
    private readonly createWorkspaceTransaction: CreateWorkspaceTransaction,
  ) {}

  async updateDetails(userId: string, updateDetailsDto: UpdateDetailsDto) {
    return this.updateDetailsTransaction.run({
      userId,
      ...updateDetailsDto,
    });
  }

  async createWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.createWorkspaceTransaction.run({
      userId,
      ...createWorkspaceDto,
    });
  }
}
