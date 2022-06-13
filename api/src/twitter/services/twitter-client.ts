import { Injectable } from '@nestjs/common';
import * as OAuth from 'oauth';
import { environment } from 'src/environments';
import { TwitterResponseDto } from '../dto';

const parseOauthResponse: any = (resolve: any, reject: any) => {
  return (error: any, oauthToken: string, oauthTokenSecret: string) => {
    if (error) {
      reject(error);
    } else {
      resolve({
        oauthToken,
        oauthTokenSecret,
      });
    }
  };
};

@Injectable()
export class TwitterClientService {
  twitterBaseUrl: string;
  redirectUrl: string;
  appId: string;
  appSecret: string;

  constructor() {
    this.twitterBaseUrl = environment.twitter.baseUrl;
    this.redirectUrl = `${environment.baseUrl}/api/auth/save-token`;
    this.appId = environment.twitter.apiKey;
    this.appSecret = environment.twitter.apiSecret;
  }

  public async getAccessTokenOAuth(
    requestToken: string,
    requestSecret: string,
    verifier: string,
  ): Promise<TwitterResponseDto> {
    const oauth: OAuth = this.getOathObject();

    return new Promise((resolve: any, reject: any) => {
      oauth.getOAuthAccessToken(
        requestToken,
        requestSecret,
        verifier,
        parseOauthResponse(resolve, reject),
      );
    });
  }

  public getRequestOAuth(): Promise<TwitterResponseDto> {
    const oauth: OAuth = this.getOathObject();

    return new Promise((resolve: any, reject: any) => {
      oauth.getOAuthRequestToken(parseOauthResponse(resolve, reject));
    });
  }

  private getOathObject(): OAuth {
    return new OAuth.OAuth(
      `${this.twitterBaseUrl}/oauth/request_token?x_auth_access_type=write`,
      `${this.twitterBaseUrl}/oauth/access_token`,
      this.appId,
      this.appSecret,
      '1.0A',
      this.redirectUrl,
      'HMAC-SHA1',
    );
  }
}
