export interface QueryListParams {
  filter?: FilterPayload;
  range?: [start: number, end: number];
  sort?: [field: string, order: OrderDirection];
}

type OrderDirection = 'asc' | 'desc' | 'ASC' | 'DESC';


export interface FilterPayload {
  [k: string]: any;
}
