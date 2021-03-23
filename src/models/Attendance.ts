import { Model, snakeCaseMappers } from 'objection';
import User from './User';
import ScheduleEvent from './ScheduleEvent'

export default class Attendance extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  code!: string;
  coordLat!: number;
  coordLng!: number;
  closesAt!: string; // ?????
  userId!: number;

  // fields in models need either optionality
  users?: User[];
  schedules?: ScheduleEvent[]

  static tableName = 'attendances';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'attendances.userId',
        to: 'users.id',
      },
    },
    schedule_events: {
      relation: Model.BelongsToOneRelation,
      modelClass: ScheduleEvent,
      join: {
        from: 'attendances.scheduleEventId',
        to: 'shedule_events.id',
      },
    }
  });

  static columnNameMappers = snakeCaseMappers();
}
