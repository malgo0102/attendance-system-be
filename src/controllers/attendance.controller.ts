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

export const getAttendanceProgress = async (req: Request, res: Response) => {
  const id = req.params.id;
  const studentsList = await attendanceService.getAttendanceProgress(id);
  res.send(studentsList);
};

export const updateAttendance = async (req: Request, res: Response) => {
  const id = req.params.id;
  const attendanceStatus = req.body;
  const attendance = await attendanceService.closeAttendanceEvent(
    id,
    attendanceStatus,
  );
  res.send(attendance);
};

export const markAttendance = async (req: Request, res: Response) => {
  const studentId = req.user?.sub ?? '';
  const attendanceId = req.params.id;
  const attendanceCode = req.body.code;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const studentIp = req.headers['x-forwarded-for'].split(',')[0].trim();
  const log = await attendanceService.markAttendance(
    studentId,
    studentIp,
    attendanceId,
    attendanceCode,
  );
  if (log) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
};
