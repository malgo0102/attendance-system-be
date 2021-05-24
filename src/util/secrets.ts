import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.error('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.error(
    'Using .env.example file to supply config environment variables',
  );
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

export const PORT = Number(process.env.PORT) || 3006;
export const ENVIRONMENT = process.env.NODE_ENV;
export const TEST_MODE = process.env.TEST_MODE === 'true';
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
prod
  ? console.error('Running production environment')
  : console.error('Running dev environment');

export const ssoManagementAccount = process.env.AUTH0_ACCOUNT as string;
export const ssoManagementClientId =
  process.env.AUTH0_NON_INTERACTIVE_CLIENT_ID;
export const ssoManagementClientSecret =
  process.env.AUTH0_NON_INTERACTIVE_CLIENT_SECRET;

export const audience = process.env.AUTH0_AUDIENCE;
export const domain = process.env.AUTH0_DOMAIN;
export const clientOriginUrl = process.env.CLIENT_ORIGIN_URL as string;
export const userRoleIds = {
  admin: process.env.AUTH0_ADMIN_ROLE_ID as string,
  teacher: process.env.AUTH0_TEACHER_ROLE_ID as string,
  student: process.env.AUTH0_STUDENT_ROLE_ID as string,
}; // id of the roles from auth0

export const clientOrigins = [clientOriginUrl];

if (!userRoleIds.admin || !userRoleIds.teacher || !userRoleIds.student) {
  throw new Error(
    '.env is missing the definition of an AUTH0_ADMIN_ROLE_ID, AUTH0_TEACHER_ROLE_ID, AUTH0_STUDENT_ROLE_ID environmental variable',
  );
}

if (!ssoManagementAccount) {
  throw new Error(
    '.env is missing the definition of an AUTH0_ACCOUNT environmental variable',
  );
}
if (!ssoManagementClientId) {
  throw new Error(
    '.env is missing the definition of an AUTH0_NON_INTERACTIVE_CLIENT_ID environmental variable',
  );
}
if (!ssoManagementClientSecret) {
  throw new Error(
    '.env is missing the definition of an AUTH0_NON_INTERACTIVE_CLIENT_SECRET environmental variable',
  );
}
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
