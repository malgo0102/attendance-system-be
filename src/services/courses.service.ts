import CourseModel, { CourseShape } from '../models/Course';
import { QueryListParams } from '../types/interfaces/QueryListParams';
import { ListResponse } from '../types/interfaces/ListResponse';
import { applyListParams } from '../util/apply-list-params';
import { getUserById } from './user.service';
import APIError from '../errors/api-error';

export async function createCourse(courseObject: CourseShape) {
  const teacher = await getUserById(courseObject.teacherId);
  if (!teacher || teacher.role !== 'Teacher') {
    throw APIError.ValidationError('Invalid teacher');
  }
  return CourseModel.query().insert(courseObject);
}

export async function getAll(
  listParams?: QueryListParams,
): Promise<ListResponse<CourseShape>> {
  const { count: totalCount } = (await CourseModel.query()
    .count()
    .first()) as any;
  let query = CourseModel.query();
  if (listParams) {
    query = applyListParams(query, listParams);
  }
  const courses = await query;
  return {
    data: courses,
    pagination: {
      total: totalCount,
      start: listParams?.range ? listParams.range[0] : 0,
      end: listParams?.range ? listParams.range[0] + courses.length - 1 : 0,
    },
  };
}

export async function getById(id: number) {
  return CourseModel.query().findById(id);
}

export async function update(id: string, updatedCourse: CourseShape) {
  const teacher = await getUserById(updatedCourse.teacherId);
  if (!teacher || teacher.role !== 'Teacher') {
    throw APIError.ValidationError('Invalid teacher');
  }
  return CourseModel.query().patchAndFetchById(id, updatedCourse);
}

export async function delete_(id: string) {
  return CourseModel.query().deleteById(id);
}
