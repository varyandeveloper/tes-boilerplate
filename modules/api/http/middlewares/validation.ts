import * as express from 'express';
import { RequestHandler } from 'express';
import { Validator } from 'class-validator';
import { ValidationError } from 'class-validator';

type Constructor<T> = { new (): T };

export function validate<T>(type: Constructor<T>): express.RequestHandler {
  const validator = new Validator();

  return async (req, res, next) => {
    const input = Object.assign(new type(), req.body);

    try {
      await validator.validateOrReject(input);
      req.body = input;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validationError(err: Error): RequestHandler {
  return async (req, res, next) => {
    if (err instanceof Array && err[0] instanceof ValidationError) {
      res.status(400).json({ errors: err }).end();
    } else {
      next(err);
    }
  };
}
