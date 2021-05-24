import { ManagementClient } from 'auth0';
import {
  ssoManagementAccount,
  ssoManagementClientId,
  ssoManagementClientSecret,
} from '../util/secrets';

export const auth0ManagementClient = new ManagementClient({
  domain: ssoManagementAccount,
  clientId: ssoManagementClientId,
  clientSecret: ssoManagementClientSecret,
  scope: 'read:users update:users',
});
