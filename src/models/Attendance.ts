import { Model, ModelObject, snakeCaseMappers } from 'objection';
import ScheduleEvent from './ScheduleEvent';

export default class Attendance extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  code!: string;
  scheduleEventId!: number;
  endTime!: Date;
  restrictIp!: boolean;
  isClosed!: boolean;
  ip?: string;

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
  });

  static columnNameMappers = snakeCaseMappers();
}
export type AttendanceShape = ModelObject<Attendance>;
