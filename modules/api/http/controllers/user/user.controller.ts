import { injectable } from 'inversify';
import autobind from 'autobind-decorator';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import AbstractUserController from './abstract.user.controller';
import responseBuilder from '../../../../../app/common/responseBuilder';

@autobind
@injectable()
export default class UserController extends AbstractUserController {
  async fetch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await this.userService.fetch(req.filter);
      if (!user) {
        return this.buildUserNotFound('User', next);
      }
      return res.json(responseBuilder(user, req.filter.target));
    } catch (error) {
      next(error);
    }
  }

  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const users = await this.userService.fetchAll(req.filter);
      return res.json(responseBuilder(users, req.filter.target));
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const userEntity = await this.userService.buildEntity(req.body);
      await this.userService.create(userEntity);
      return res
        .json({ message: 'User successfully created.' })
        .status(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async patch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await this.userService.fetch(req.filter);
      if (!user) {
        return this.buildUserNotFound('User', next);
      }
      const userEntity = await this.userService.buildEntity(req.body);
      await this.userService.update(Object.assign({}, user, userEntity));
      return res.json({ message: 'User successfully updated.' });
    } catch (error) {
      next(error);
    }
  }
}
