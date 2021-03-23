import { Model, snakeCaseMappers } from 'objection';
import Class from './Class';
import Attendance from './Attendance';
import Course from './Course';

export default class User extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: string;
  password!: string;
  classId!: number;

  // fields in models need either optionality
  classes?: Class[];
  courses?: Course[];
  attendances?: Attendance[];

  static tableName = 'users';

  // this object defines the relations to other models.
  static relationMappings = () => ({
    classes: {
      relation: Model.BelongsToOneRelation,
      modelClass: Class,
      join: {
        from: 'users.classId',
        to: 'classes.id',
      },
    },
    attendances: {
      relation: Model.HasManyRelation,
      modelClass: Attendance,
      join: {
        from: 'users.id',
        to: 'attendances.userId',
      },
    },
    courses: {
      relation: Model.HasManyRelation,
      modelClass: Attendance,
      join: {
        from: 'users.id',
        to: 'courses.teacherId',
      },
    },
  });

  static columnNameMappers = snakeCaseMappers();
}
