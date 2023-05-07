export interface Tables<T> {
  total: number;
  models: T[];
}

export interface Table<T> {
  index: number;
  model: T;
}
