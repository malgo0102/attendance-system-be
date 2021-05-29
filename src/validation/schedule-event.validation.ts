import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import validateRequest from '../util/validate-request';

export function createEvent(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    courseId: Joi.number().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    repeatWeekly: Joi.boolean().required(),
    until: Joi.when('repeatWeekly', {
      is: true,
      then: Joi.date().required(),
    }),
  });
  validateRequest(req, next, schema);
}
export function updateEvent(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    courseId: Joi.number(),
    start: Joi.date(),
    end: Joi.date(),
  });
  validateRequest(req, next, schema);
}
