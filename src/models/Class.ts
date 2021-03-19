import { Model, snakeCaseMappers } from 'objection';
import User from './User';
//import ClassCourses from 'ClassCourses';

export default class Class extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  name!: string;

  // fields in models need either optionality
  users?: User[];
  // todo: classCourses?: ClassCourses[]

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
    // todo: define here relation with ClassCourses
  });

  static columnNameMappers = snakeCaseMappers();
}
