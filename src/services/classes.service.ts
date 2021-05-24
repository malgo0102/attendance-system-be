import ClassModel, { ClassShape } from '../models/Class';
import { QueryListParams } from '../types/interfaces/QueryListParams';
import { applyListParams } from '../util/apply-list-params';
import { ListResponse } from '../types/interfaces/ListResponse';

export async function create(classObject: ClassShape) {
  return ClassModel.query().insert({
    ...classObject,
  });
}

export async function getAll(
  listParams?: QueryListParams,
): Promise<ListResponse<ClassShape>> {
  const { count: totalCount } = (await ClassModel.query()
    .count()
    .first()) as any;
  let query = ClassModel.query();
  if (listParams) {
    query = applyListParams(query, listParams);
  }
  const classes = await query;
  return {
    data: classes,
    pagination: {
      total: totalCount,
      start: listParams?.range ? listParams.range[0] : 0,
      end: listParams?.range ? listParams.range[0] + classes.length - 1 : 0,
    },
  };
}

export async function getById(id: string) {
  return ClassModel.query().findById(id);
}

export async function update(id: string, updatedClass: ClassShape) {
  return ClassModel.query().patchAndFetchById(id, {
    ...updatedClass,
  });
}

export async function delete_(id: string) {
  return ClassModel.query().deleteById(id);
}
