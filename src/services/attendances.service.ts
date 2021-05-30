import { getById } from './schedule-event.service';
import APIError from '../errors/api-error';
import Attendance, { AttendanceShape } from '../models/Attendance';
import { generateAttendanceCode } from '../util/generate-attendance-code';

const CODE_LENGTH = 6;

export async function startAttendance(attendanceObject: AttendanceShape) {
  const code = generateAttendanceCode(CODE_LENGTH);
  const scheduleEvent = await getById(attendanceObject.scheduleEventId);
  if (!scheduleEvent) {
    throw APIError.ValidationError('Invalid schedule event');
  }
  return Attendance.query().insert({
    ...attendanceObject,
    code,
    isClosed: false,
  });
}

export async function getAttendanceEvent(id: string) {
  return Attendance.query()
    .withGraphFetched('scheduleEvent.[course]')
    .findById(id);
}
