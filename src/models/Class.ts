import { Model, snakeCaseMappers } from 'objection';
import User from './User';
import ClassCourse from './ClassCourse';

export default class Class extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  name!: string;

  // fields in models need either optionality
  users?: User[];
  classCourses?: ClassCourse[];

  static tableName = 'classes';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    users: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'classes.id',
        to: 'users.userId',
      },
    },
    classCourses: {
      relation: Model.HasManyRelation,
      modelClass: ClassCourse,
      join: {
        from: 'classes.id',
        to: 'class_courses.classId',
      },
    },
  });

  static columnNameMappers = snakeCaseMappers();
}
