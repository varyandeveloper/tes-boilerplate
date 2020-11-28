import l from '../../../../app/common/logger';
import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  l.error(err);
  if (err instanceof Array && err[0] instanceof ValidationError) {
    const formattedErrors = {};
    err.forEach((error) => {
      if (!(error.property in formattedErrors)) {
        formattedErrors[error.property] = [];
      }
      formattedErrors[error.property].push(error.constraints);
    });
    return res.status(400).json(formattedErrors);
  }
  res.status(err.status || err.statusCode || 500);
  return res.json({ message: err.message || err.msg || 'Server side error' });
}
