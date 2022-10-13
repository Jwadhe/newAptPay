import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSchema, Auth } from './schema/auth.schema';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import {configuration} from '../config/configuration'


@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration]
    }),  
    UsersModule, PassportModule, JwtModule.register({
      secret: 'ja@123xyfheurykjjajdfuhef!h',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),     
],
  controllers: [AuthController],
  providers: [AuthService]
})


export class AuthModule {}
