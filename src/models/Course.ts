import { Model, snakeCaseMappers } from 'objection';
import User from './User';
import ClassCourse from './ClassCourse';

export default class Course extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  name! : string;
  userId!: number;

    // fields in models need either optionality
    class_courses?: ClassCourse[];
    users?: User[];
  
    static tableName = 'courses';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    class_courses: {
      relation: Model.HasManyRelation,
      modelClass: ClassCourse,
      join: {
        from: 'class_courses.id',
        to: 'courses.classCourseId'
      }
    },
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'courses.userId',
        to: 'users.id',
      },
    }
  });

  static columnNameMappers = snakeCaseMappers();
}