export type IncomingQueryType<T> = {
  message: string;
  total: number;
  results: T[];
};
