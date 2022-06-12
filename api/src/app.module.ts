import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TwitterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
