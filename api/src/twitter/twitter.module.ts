import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialSchemaName, CredentialSchema } from './schemas';
import {
  AuthService,
  CredentialService,
  TwitterClientService,
} from './services';
import { TwitterAuthController } from './controllers';

@Module({
  controllers: [TwitterAuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: CredentialSchemaName,
        schema: CredentialSchema,
      },
    ]),
  ],
  providers: [TwitterClientService, AuthService, CredentialService],
})
export class TwitterModule {}
