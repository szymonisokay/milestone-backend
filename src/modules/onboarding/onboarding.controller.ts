import { ActiveUser } from '@/decorators/active-user.decorator';
import { User } from '@/entities/user.entity';
import { CreateWorkspaceDto } from '@/modules/onboarding/dto/create-workspace.dto';
import { UpdateDetailsDto } from '@/modules/onboarding/dto/update-details.dto';
import { OnboardingService } from '@/modules/onboarding/onboarding.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('/details')
  updateDetails(@ActiveUser() user: User, @Body() body: UpdateDetailsDto) {
    return this.onboardingService.updateDetails(user.id, body);
  }

  @Post('/workspace')
  createWorkspace(@ActiveUser() user: User, @Body() body: CreateWorkspaceDto) {
    return this.onboardingService.createWorkspace(user.id, body);
  }
}
