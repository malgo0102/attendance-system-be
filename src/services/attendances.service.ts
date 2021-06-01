import { auth0ManagementClient } from './auth0-managament.service';
import { getById } from './schedule-event.service';
import APIError from '../errors/api-error';
import Attendance, { AttendanceShape } from '../models/Attendance';
import { generateAttendanceCode } from '../util/generate-attendance-code';
import { userdataToUser } from '../util/userdata-to-user';

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
  const studentsList = allStudentsInRelatedClass.map(student => ({
    ...student,
    isPresent: studentsThatMarkedAttendanceIdList.includes(student.id),
  }));
  return studentsList;
}

export async function closeAttendanceEvent(
  id: string,
  attendanceObject: AttendanceShape,
) {
  return Attendance.query().patchAndFetchById(id, {
    isClosed: attendanceObject.isClosed,
  });
}
