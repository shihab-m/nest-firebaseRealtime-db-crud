import { TypeOrmModuleOptions } from '@nestjs/typeorm/index';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { toBool } from './app/application_module/utils/util.functions';

config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`,
  ),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';

export const ENV = {
  port: +process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,

  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,

};
