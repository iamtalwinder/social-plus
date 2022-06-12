import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialSchemaName, CredentialSchema } from './schemas';

@Module({
  controllers: [TwitterController],
  imports: [
    MongooseModule.forFeature([
      {
        name: CredentialSchemaName,
        schema: CredentialSchema,
      },
    ]),
  ],
  providers: [TwitterService],
})
export class TwitterModule {}
