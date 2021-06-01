import { Model, ModelObject, snakeCaseMappers } from 'objection';
import ScheduleEvent from './ScheduleEvent';
import AttendanceLog from './AttendanceLog';

export default class Attendance extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  code!: string;
  scheduleEventId!: number;
  endTime!: Date;
  restrictIp!: boolean;
  isClosed!: boolean;
  ip?: string;
  scheduleEvent!: ScheduleEvent;
  logs!: AttendanceLog[];

  static tableName = 'attendances';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    scheduleEvent: {
      relation: Model.BelongsToOneRelation,
      modelClass: ScheduleEvent,
      join: {
        from: 'attendances.schedule_event_id',
        to: 'schedule_event.id',
      },
    },
    logs: {
      relation: Model.HasManyRelation,
      modelClass: AttendanceLog,
      join: {
        from: 'attendances.id',
        to: 'attendance_logs.attendance_id',
      },
    },
  });

  static columnNameMappers = snakeCaseMappers();
}
export type AttendanceShape = ModelObject<Attendance>;
