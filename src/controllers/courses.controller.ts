'use strict';

import { Response, Request } from 'express';
import * as coursesService from '../services/courses.service';

export const createCourse = async (req: Request, res: Response) => {
  const newCourse = await coursesService.createCourse(req.body);
  res.send(newCourse);
};

export const getAllCourses = async (req: Request, res: Response) => {
  const listParameters = req.queryListParams;
  const { data, pagination } = await coursesService.getAll(listParameters);
  if (pagination) {
    res.header(
      'Content-Range',
      `users ${pagination.start}-${pagination.end}/${pagination.total}`,
    );
  }
  res.send(data);
};

export const getCourseById = async (req: Request, res: Response) => {
  const data = await coursesService.getById(Number(req.params.id));
  res.send(data);
};

export const updateCourse = async (req: Request, res: Response) => {
  const updatedCourse = req.body;
  const data = await coursesService.update(req.params.id, updatedCourse);
  res.send(data);
};

export const deleteCourseById = async (req: Request, res: Response) => {
  await coursesService.delete_(req.params.id);
  return res.json({
    data: { id: req.params.id },
  });
};
