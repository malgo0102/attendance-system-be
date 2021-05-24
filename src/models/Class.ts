import { Model, ModelObject, snakeCaseMappers } from 'objection';

export default class ClassModel extends Model {
  id!: number;
  name!: string;

  static tableName = 'classes';
  static columnNameMappers = snakeCaseMappers();
}
export type ClassShape = ModelObject<ClassModel>;
