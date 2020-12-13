import * as express from 'express';
import { Validator } from 'class-validator';

type Constructor<T> = { new (): T };

export function validate<T>(
  type: Constructor<T>,
  skipUndefined = false
): express.RequestHandler {
  return async (req, res, next) => {
    const validator = new Validator();
    const input = Object.assign(new type(), req.body, req.query);

    try {
      await validator.validateOrReject(input, {
        skipUndefinedProperties: skipUndefined,
      });
      req.body = input;
      next();
    } catch (error) {
      next(error);
    }
  };
}
