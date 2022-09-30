import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSchema, Auth } from './schema/auth.schema';
import { ConfigModule } from '@nestjs/config';
// import {configuration} from '../config/configuration'


@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration]
    }),  
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        
],
  controllers: [AuthController],
  providers: [AuthService]
})


export class AuthModule {}
