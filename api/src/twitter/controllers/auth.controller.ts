import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';

@Controller('twitter/auth')
export class TwitterAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('connect')
  public async connect(@Res() res: FastifyReply<any>) {
    res.redirect(301, await this.authService.generateAuthorizationUrl());
  }
}
