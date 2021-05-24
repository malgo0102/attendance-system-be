import { Request, NextFunction } from 'express';
import { Schema, ValidationOptions } from 'joi';
import APIError from '../errors/api-error';

export default function(req: Request, next: NextFunction, schema: Schema) {
  const options: ValidationOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw APIError.ValidationError(error.details.map((x: any) => x.message));
  } else {
    req.body = value;
    next();
  }
}
