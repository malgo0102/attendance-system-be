import { Model, ModelObject, snakeCaseMappers } from 'objection';
import CourseModel from './Course';

export default class ScheduleEvent extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  start!: Date;
  end!: Date;
  courseId!: number;

  static tableName = 'schedule_event';
  static columnNameMappers = snakeCaseMappers();

  static relationMappings = {
    course: {
      relation: Model.BelongsToOneRelation,
      modelClass: CourseModel,
      join: {
        from: 'schedule_event.course_id',
        to: 'courses.id',
      },
    },
  };
}

export type ScheduleEventShape = ModelObject<ScheduleEvent>;
