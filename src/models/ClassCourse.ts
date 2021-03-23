import { Model, snakeCaseMappers } from 'objection';
import Class from './Class';
import Course from './Course';
import ScheduleEvent from './ScheduleEvent'

export default class ClassCourse extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  isActive! : boolean;

    // fields in models need either optionality
    classes?: Class[];
    schedule_events?: ScheduleEvent[];
    courses?: Course[];
  
    static tableName = 'class_courses';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    classes: {
      relation: Model.BelongsToOneRelation,
      modelClass: Class,
      join: {
        from: 'classCourses.classId',
        to: 'classes.id',
      },
    },
    schedule_events: {
      relation: Model.HasManyRelation,
      modelClass: ScheduleEvent,
      join: {
        from: 'classCourses.id',
        to: 'schedule_events.classCourseId',
      },
    },
    courses: {
      relation: Model.BelongsToOneRelation,
      modelClass: Course,
      join: {
        from: 'classCourses.courseId',
        to: 'courses.id',
      },
    }
  });

  static columnNameMappers = snakeCaseMappers();
}

