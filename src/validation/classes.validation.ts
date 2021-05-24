import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import validateRequest from '../util/validate-request';

export function createClass(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
export function updateClass(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
