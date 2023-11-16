import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { ENV } from './ENV';
import { AppModule } from './app.module';
import { createDocument } from './app/application_module/swagger/swagger';
const appOptions: NestApplicationOptions = {
  cors: true,
};
import * as admin from 'firebase-admin'

const serviceAccount = require('../serviceAccount.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ENV.FIREBASE_DATABASE_URL
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  app.enableCors();
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(ENV.API_PREFIX, { exclude: ['health'] });
  
  SwaggerModule.setup('/docs', app, createDocument(app));
  

  await app.listen(ENV.port, () =>
    console.log(`Server is running on port ${ENV.port}`),
  );
}
bootstrap();
