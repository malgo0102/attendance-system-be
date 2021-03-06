import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import validateRequest from '../util/validate-request';

export function createCourse(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
    teacherId: Joi.string().required(),
    classId: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

export function updateCourse(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string(),
    teacherId: Joi.string(),
    classId: Joi.number(),
  });
  validateRequest(req, next, schema);
}
