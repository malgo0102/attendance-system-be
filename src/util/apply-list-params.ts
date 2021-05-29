import { Model, QueryBuilder } from 'objection';
import { QueryListParams } from '../types/interfaces/QueryListParams';

export function applyListParams<M extends Model, R = M[]>(
  query: QueryBuilder<M, R>,
  listParams: QueryListParams,
): QueryBuilder<M, R> {
  const { range, sort, filter } = listParams;
  if (filter) {
    query = query.where(filter[0], filter[1]);
  }
  if (range) {
    query = query.limit(range[1] - range[0] + 1).offset(range[0]);
  }
  if (sort) {
    query.orderBy(sort[0], sort[1]);
  }

  return query;
}
