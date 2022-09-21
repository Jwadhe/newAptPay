import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
