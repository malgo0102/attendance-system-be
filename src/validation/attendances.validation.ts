import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import validateRequest from '../util/validate-request';

export function createAttendance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object({
    scheduleEventId: Joi.number().required(),
    endTime: Joi.date().required(),
    restrictIp: Joi.boolean().required(),
    ip: Joi.when('restrictIp', {
      is: true,
      then: Joi.string()
        .ip()
        .required(),
    }),
  });
  validateRequest(req, next, schema);
}

export function updateAttendance(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object({
    isClosed: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
}
