import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.log('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.log('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

export const PORT = process.env.PORT;
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
prod
  ? console.log('Running production environment')
  : console.log('Running dev environment');

export const audience = process.env.AUTH0_AUDIENCE;
export const domain = process.env.AUTH0_DOMAIN;
export const clientOriginUrl = process.env.CLIENT_ORIGIN_URL as string;

export const clientOrigins = [clientOriginUrl];

if (!audience) {
  throw new Error(
    '.env is missing the definition of an AUTH0_AUDIENCE environmental variable',
  );
}

if (!domain) {
  throw new Error(
    '.env is missing the definition of an AUTH0_DOMAIN environmental variable',
  );
}

if (!clientOriginUrl) {
  throw new Error(
    '.env is missing the definition of a APP_ORIGIN environmental variable',
  );
}
