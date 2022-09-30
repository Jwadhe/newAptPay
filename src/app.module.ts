import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'
import { Auth, AuthSchema } from './auth/schema/auth.schema';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !env ? '.env' : `.env.${env}`,
      isGlobal: true,
      expandVariables: true,
      
    }), 
    MongooseModule.forRoot('mongodb://localhost/newAptPay'),
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
  ]) as DynamicModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}