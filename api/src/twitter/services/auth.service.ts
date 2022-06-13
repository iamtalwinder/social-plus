import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { environment } from 'src/environments';
import { TwitterResponseDto } from '../dto';
import { CredentialDocument } from '../schemas';
import { CredentialService } from './credential.service';
import { TwitterClientService } from './twitter-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly twitterClient: TwitterClientService,
    private readonly credentialService: CredentialService,
  ) {}

  public async saveToken(token: string, verifier: string): Promise<string> {
    const settings: CredentialDocument =
      await this.credentialService.getByRequestToken(token);
    if (!settings) {
      throw new HttpException(
        'Invalid session Please try Again.',
        HttpStatus.NOT_FOUND,
      );
    }

    const tokenDetails: TwitterResponseDto =
      await this.twitterClient.getAccessTokenOAuth(
        token,
        settings.requestSecret,
        verifier,
      );

    await this.credentialService.updateById(settings._id, {
      accessSecret: tokenDetails.oauthTokenSecret,
      accessToken: tokenDetails.oauthToken,
    });

    return `${environment.baseUrl}twitter/auth/success`;
  }

  public async generateAuthorizationUrl(): Promise<string> {
    const tokenDetails: TwitterResponseDto = await this.twitterClient
      .getRequestOAuth()
      .catch((error: any) => {
        Logger.warn({
          error,
          message: 'unable to authenticate',
        });
        throw new HttpException(
          `Unable to authenticate.`,
          HttpStatus.NON_AUTHORITATIVE_INFORMATION,
        );
      });

    await this.credentialService.create(null, {
      requestSecret: tokenDetails.oauthTokenSecret,
      requestToken: tokenDetails.oauthToken,
    });

    return `${this.twitterClient.twitterBaseUrl}/oauth/authorize?oauth_token=${tokenDetails.oauthToken}&oauth_access_type=write`;
  }
}
