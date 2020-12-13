import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export default (validateResourceId = false) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const partials: string[] = req.path.split('/');

    req.resource = partials[3];

    if (validateResourceId) {
      let i = 4;
      // if routes are correct all plural indexes should contain uuids
      // so we are going to validate all plural indexes to be a valid uuid
      while (partials[i]) {
        if (!partials[i]) {
          break;
        }
        if (
          partials[i] &&
          !partials[i].match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          )
        ) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Invalid resource id provided.' });
        }
        i += 2;
      }
    }
    return next();
  };
};
