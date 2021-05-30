import { Model, ModelObject, snakeCaseMappers } from 'objection';
import ClassModel from './Class';

export default class CourseModel extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  name!: string;
  teacherId!: string;
  classId!: number;

  static tableName = 'courses';
  static columnNameMappers = snakeCaseMappers();

  static relationMappings = {
    courses: {
      relation: Model.BelongsToOneRelation,
      modelClass: ClassModel,
      join: {
        from: 'courses.class_id',
        to: 'classes.id',
      },
    },
  };
}
//https://dev.to/htunnicliff/comment/17ngc
export type CourseShape = ModelObject<CourseModel>;
