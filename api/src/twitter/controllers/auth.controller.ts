import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';

@Controller('twitter/auth')
export class TwitterAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('connect')
  public async connect(@Res() res: FastifyReply<any>) {
    res.redirect(301, await this.authService.generateAuthorizationUrl());
  }

  @Get('save-token')
  public async twitterRedirect(
    @Query('oauth_token') oauthToken: string,
    @Query('oauth_verifier') oauthVerifier: string,
    @Res() res: FastifyReply<any>,
  ): Promise<void> {
    console.log('test');
    try {
      res.redirect(
        301,
        await this.authService.saveToken(oauthToken, oauthVerifier),
      );
    } catch (e) {
      Logger.log({
        message: 'unable to authenticate.',
        response: {
          body: e,
        },
      });
      throw new HttpException(
        `unable to authenticate.`,
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
  }

  @Get('success')
  public async twitterSuccess(): Promise<string> {
    return 'success';
  }
}
