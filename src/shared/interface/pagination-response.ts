import { IPagination } from "./pagination-interface";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}
