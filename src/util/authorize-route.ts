import { domain, audience, TEST_MODE } from './secrets';
import jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import { Handler, Request, Response, NextFunction } from 'express';

export const checkJwt = () => {
  if (TEST_MODE) {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  }
  return jwt({
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
};

export const checkPermissions = (permissions: string | string[]): Handler => {
  if (TEST_MODE) {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  }
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
