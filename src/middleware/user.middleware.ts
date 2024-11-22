import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { User } from '@/entities/user.entity';
import { decodeToken } from '@/modules/auth/utils/jwt-actions';
import { DataSource } from 'typeorm';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const userId = decodeToken(req.cookies[process.env.AUTH_COOKIE!]);

    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: userId,
      },
      select: ['id', 'email'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;

    next();
  }
}
