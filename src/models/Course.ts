import { Model, ModelObject, snakeCaseMappers } from 'objection';

export default class CourseModel extends Model {
  // for not-null fields that are always initialized, we can use the ! syntax:
  id!: number;
  name!: string;
  userId!: number;

  static tableName = 'courses';
  static columnNameMappers = snakeCaseMappers();
}

// https://dev.to/htunnicliff/comment/17ngc
// The `ModelObject` generic gives you a clean interface
// that can be used on the frontend, without any of the
// objection Model class properties or methods.
export type CourseShape = ModelObject<CourseModel>;
