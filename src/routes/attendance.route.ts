import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as attendanceController from '../controllers/attendance.controller';
const attendanceRouter = Router();

attendanceRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:attendance']),
  wrap(attendanceController.startAttendance),
);

attendanceRouter.get(
  '/:id',
  checkJwt(),
  checkPermissions(['read:attendance']),
  wrap(attendanceController.getOne),
);

export default attendanceRouter;
