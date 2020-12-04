declare namespace Express {
  interface Request {
    filter;
    formEntity;
  }

  interface Error {
    msg: string;
    status: number;
    message: string;
    statusCode: number;
  }
}
