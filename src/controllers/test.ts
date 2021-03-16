'use strict';

import { Response, Request, NextFunction } from 'express';

/**
 * Example API Route.
 * @route GET /api
 */
export const getExample = (req: Request, res: Response): void => {
  res.send({
    message: 'test',
  });
};
