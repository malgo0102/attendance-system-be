export interface ListResponse<R> {
  data: Array<R>;
  pagination?: {
    total: number;
    start: number;
    end: number;
  };
}
