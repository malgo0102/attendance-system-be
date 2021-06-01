import { auth0ManagementClient } from './auth0-managament.service';
import { getById } from './schedule-event.service';
import APIError from '../errors/api-error';
import Attendance, { AttendanceShape } from '../models/Attendance';
import { generateAttendanceCode } from '../util/generate-attendance-code';
import { userdataToUser } from '../util/userdata-to-user';
import * as userService from '../services/user.service';
import AttendanceLog from '../models/AttendanceLog';

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
    .withGraphFetched('[scheduleEvent.[course], logs]')
    .findById(id);
}

export async function getAttendanceProgress(id: string) {
  const attendance = await Attendance.query()
    .withGraphFetched('[scheduleEvent.[course], logs]')
    .findById(id);
  const classId = attendance.scheduleEvent.course.classId;
  const studentsThatMarkedAttendanceIdList = attendance.logs.map(
    log => log.userId,
  );
  const allStudentsInRelatedClass = (
    await auth0ManagementClient.getUsers({
      q: `app_metadata.classId:${classId} AND app_metadata.role:"Student"`,
    })
  ).map(student => userdataToUser(student));
  return allStudentsInRelatedClass.map(student => ({
    ...student,
    isPresent: studentsThatMarkedAttendanceIdList.includes(student.id),
  }));
}

export async function closeAttendanceEvent(
  id: string,
  attendanceObject: AttendanceShape,
) {
  return Attendance.query().patchAndFetchById(id, {
    isClosed: attendanceObject.isClosed,
  });
}

export async function markAttendance(
  studentId: string,
  studentIp: string,
  attendanceId: string,
  attendanceCode: string,
) {
  const attendanceEvent = await Attendance.query()
    .withGraphFetched('[scheduleEvent.[course], logs]')
    .where('code', attendanceCode)
    .first();
  if (!attendanceEvent) {
    throw APIError.ResourceNotFound('Attendance', attendanceCode);
  }
  if (attendanceEvent.code !== attendanceCode) {
    throw APIError.BadRequest('Invalid code');
  }
  if (
    attendanceEvent.endTime.getTime() < new Date().getTime() ||
    attendanceEvent.isClosed
  ) {
    throw APIError.BadRequest('Attendance expired');
  }
  if (attendanceEvent.restrictIp && attendanceEvent.ip !== studentIp) {
    throw APIError.BadRequest('Attendance limited by ip');
  }
  const student = await userService.getUserById(studentId);
  if (student.role !== 'Student') {
    throw APIError.BadRequest('Only students can mark attendance');
  }
  if (student.classId !== attendanceEvent.scheduleEvent.course.classId) {
    throw APIError.BadRequest('You are not part of this class');
  }
  if (
    attendanceEvent.logs.find(
      log =>
        log.userId === student.id && log.attendanceId === attendanceEvent.id,
    )
  ) {
    throw APIError.BadRequest(
      'You have already submitted your presence for this class',
    );
  }

  return AttendanceLog.query().insert({
    attendanceId: Number(attendanceEvent.id),
    userId: studentId,
  });
}
