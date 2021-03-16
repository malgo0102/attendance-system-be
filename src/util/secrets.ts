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
