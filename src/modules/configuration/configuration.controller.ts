import { Controller, Get } from '@nestjs/common';

import { ActiveUser } from '@/decorators/active-user.decorator';
import { ConfigurationService } from '@/modules/configuration/configuration.service';
import { User } from '@/modules/user/user.entity';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getConfiguration(@ActiveUser() user: User) {
    return this.configurationService.getConfiguration(user.id);
  }
}
