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
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, UserRepository, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
