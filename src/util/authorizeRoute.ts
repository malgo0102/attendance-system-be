import { domain, audience } from './secrets';
import jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import { Handler } from 'express';

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
});

export const checkPermissions = (permissions: string | string[]): Handler => {
  let permissionsList: string[];
  if (Array.isArray(permissions)) {
    permissionsList = permissions;
  } else {
    permissionsList = [permissions];
  }
  return jwtAuthz(permissionsList, {
    customScopeKey: 'permissions',
    checkAllScopes: true,
    failWithError: true,
  });
};
