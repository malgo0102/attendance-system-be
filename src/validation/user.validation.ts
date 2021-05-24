import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import validateRequest from '../util/validate-request';

export function createUser(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string()
      .valid('Admin', 'Teacher', 'Student')
      .required(),
    classId: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}
