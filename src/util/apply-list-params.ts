import { Model, QueryBuilder } from 'objection';
import { QueryListParams } from '../types/interfaces/QueryListParams';

export function applyListParams<M extends Model, R = M[]>(
  query: QueryBuilder<M, R>,
  listParams: QueryListParams,
): QueryBuilder<M, R> {
  const { range, sort } = listParams;
  if (range) {
    query = query.limit(range[1] - range[0] + 1).offset(range[0]);
  }
  if (sort) {
    query.orderBy(sort[0], sort[1]);
  }
  //TODO AP 24.05.2021: Filters

  return query;
}
