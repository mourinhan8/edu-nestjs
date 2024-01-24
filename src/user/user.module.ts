import {
  // Global,
  Module,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.stragery';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumer/email.consumer';

// @Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'send-mail' }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    JwtStrategy,
    EmailConsumer,
  ],
  exports: [UserService],
})
export class UserModule {}
