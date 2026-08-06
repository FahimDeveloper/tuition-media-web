export type IncomingQueryType<T> = {
  message: string;
  total: number;
  results: T[];
};

export type TGlobalResponse<T = undefined> = {
  message: string;
  results?: T;
};
