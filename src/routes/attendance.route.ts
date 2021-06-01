import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as attendanceController from '../controllers/attendance.controller';
import * as attendanceValidation from '../validation/attendances.validation';
const attendanceRouter = Router();

attendanceRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:attendance']),
  attendanceValidation.createAttendance,
  wrap(attendanceController.startAttendance),
);

attendanceRouter.get(
  '/:id',
  checkJwt(),
  checkPermissions(['read:attendance']),
  wrap(attendanceController.getOne),
);

attendanceRouter.get(
  '/:id/progress',
  wrap(attendanceController.getAttendanceProgress),
);

attendanceRouter.put(
  '/:id',
  checkJwt(),
  checkPermissions(['update:attendance']),
  attendanceValidation.updateAttendance,
  wrap(attendanceController.updateAttendance),
);

attendanceRouter.post(
  '/submit',
  checkJwt(),
  attendanceValidation.markAttendance,
  wrap(attendanceController.markAttendance),
);

export default attendanceRouter;
