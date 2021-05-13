import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-error';

export default function(
  err: APIError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.error(err);
  return res.status(err.statusCode || 500).send(err);
}
