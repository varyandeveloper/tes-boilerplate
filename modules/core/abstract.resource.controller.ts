import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

@injectable()
export default abstract class AbstractResourceController {
  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  async fetch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  async patch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  async put(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    next({
      message: 'Action not supported.',
      statusCode: StatusCodes.NOT_IMPLEMENTED,
    });
  }

  protected buildUserNotFound(entityName: string, next: NextFunction): void {
    next({
      message: `${entityName} not found`,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}
