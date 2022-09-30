import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigModule} from '@nestjs/config'
import { ValidationPipe, RequestMethod } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    
  }));
  // app.setGlobalPrefix('v1', {
  //   exclude: [{ path: 'health', method: RequestMethod.GET }],
  // });
  await app.listen(3001, ()=>{
    console.log(`
    ################################################
    🛡️  NestJs Server listening on port: 3001 🛡️
    ################################################
  `);    
  });
}
bootstrap();