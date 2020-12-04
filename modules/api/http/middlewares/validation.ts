import * as express from 'express';
import { Validator } from 'class-validator';

type Constructor<T> = { new (): T };

export function validate<T>(type: Constructor<T>): express.RequestHandler {
  return async (req, res, next) => {
    const validator = new Validator();
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
