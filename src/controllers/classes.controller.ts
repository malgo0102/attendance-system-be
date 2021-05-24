'use strict';

import { Response, Request } from 'express';
import * as classesService from '../services/classes.service';

export const createClass = async (req: Request, res: Response) => {
  const newClass = await classesService.create(req.body);
  res.send(newClass);
};

export const getAllClasses = async (req: Request, res: Response) => {
  const listParameters = req.queryListParams;
  const { data, pagination } = await classesService.getAll(listParameters);
  if (pagination) {
    res.header(
      'Content-Range',
      `users ${pagination.start}-${pagination.end}/${pagination.total}`,
    );
  }
  res.send(data);
};

export const getClassById = async (req: Request, res: Response) => {
  const data = await classesService.getById(req.params.id);
  res.send(data);
};

export const updateClass = async (req: Request, res: Response) => {
  const updatedClass = req.body;
  const data = await classesService.update(req.params.id, updatedClass);
  res.send(data);
};

export const deleteClassById = async (req: Request, res: Response) => {
  await classesService.delete_(req.params.id);
  return res.json({
    data: { id: req.params.id },
  });
};
