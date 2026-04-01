export interface IResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class Result<T> implements IResult<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public error?: string,
  ) {}

  static success<T>(data: T): Result<T> {
    return new Result<T>(true, data);
  }

  static error<T>(error: string): Result<T> {
    return new Result<T>(false, undefined, error);
  }
}
