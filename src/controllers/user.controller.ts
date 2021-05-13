'use strict';

import { Response, Request } from 'express';

/**
 * API Route get current user details
 * @route POST /me
 */
export const me = (req: Request, res: Response): void => {
  console.log('test');
  res.send({
    message: 'test',
  });
};
