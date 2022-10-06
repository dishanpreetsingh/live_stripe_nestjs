import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeController } from './controller/stripe.controller';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './schema/user.schema';
import { StripeService } from './stripe.service';
import { UserService } from './user.service';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '24h' },
  }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://dishanpreet:dishan@cluster0.1j1jojz.mongodb.net/stripe_nestjs?retryWrites=true&w=majority"),
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema
      }
  ])
  ],
  controllers: [UserController,StripeController],
  providers: [StripeService,UserService, JwtStrategy],
})
export class AppModule {}
