import { Model, snakeCaseMappers } from 'objection';
import Attendance from './Attendance';
import ClassCourse from './ClassCourse';

export default class ScheduleEvent extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  isActive! : boolean;

    // fields in models need either optionality
    attendances?: Attendance[];
    class_courses?: ClassCourse[];
  
    static tableName = 'schedule_events';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    attendances: {
      relation: Model.HasManyRelation,
      modelClass: Attendance,
      join: {
        from: 'schedule_events.id',
        to: 'attendances.attendanceId',
      },
    },
    class_courses: {
      relation: Model.BelongsToOneRelation,
      modelClass: ClassCourse,
      join: {
        from: 'schedule_events.classCourseId',
        to: 'class_courses.id',
      },
    }
  });

  static columnNameMappers = snakeCaseMappers();
}