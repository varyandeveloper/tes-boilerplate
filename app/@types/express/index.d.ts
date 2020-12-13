declare namespace Express {
  interface Request {
    filter;
    formEntity;
    resource: string;
  }

  interface Error {
    msg: string;
    status: number;
    message: string;
    statusCode: number;
  }
}
