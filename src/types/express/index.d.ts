import { QueryListParams } from '../interfaces/QueryListParams';

declare global {
  namespace Express {
    export interface Request {
      queryListParams?: QueryListParams;
    }

    export interface User {
      iss: string;
      sub: string;
      aud: any;
      iat: number;
      exp: number;
      azp: string;
      scope: string;
      permissions: string[];
    }
  }
}
