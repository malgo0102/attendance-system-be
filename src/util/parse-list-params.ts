import { NextFunction, Request, Response } from 'express';
import { QueryListParams } from '../types/interfaces/QueryListParams';

export default (req: Request, res: Response, next: NextFunction) => {
  const listParams: QueryListParams = req.query;
  if (req.query.range) {
    listParams.range = JSON.parse(req.query.range as string);
  }
  if (req.query.sort) {
    listParams.sort = JSON.parse(req.query.sort as string);
  }
  if (req.query.filter) {
    listParams.filter = JSON.parse(req.query.filter as string);
  }

  req.queryListParams = listParams;
  next();
};
