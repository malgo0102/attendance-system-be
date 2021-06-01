import { Model, ModelObject, snakeCaseMappers } from 'objection';

export default class AttendanceLog extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  attendanceId!: number;
  userId!: string;

  static tableName = 'attendance_logs';

  static columnNameMappers = snakeCaseMappers();
}
export type AttendanceLogShape = ModelObject<AttendanceLog>;
