'use strict';

import { Response, Request } from 'express';
import * as attendanceService from '../services/attendances.service';
import APIError from '../errors/api-error';

export const startAttendance = async (req: Request, res: Response) => {
  const attendance = await attendanceService.startAttendance(req.body);
  res.send(attendance);
};

export const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const attendance = await attendanceService.getAttendanceEvent(id);
  if (!attendance) {
    throw APIError.ResourceNotFound('Attendance', id);
  }
  res.send(attendance);
};
