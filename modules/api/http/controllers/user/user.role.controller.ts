import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../../app/config/types';
import { Request, Response, NextFunction } from 'express';
import AbstractUserController from './abstract.user.controller';
import responseBuilder from '../../../../../app/common/responseBuilder';
import { RoleServiceInterface } from '../../../services/role/role.service.schema';

@autobind
@injectable()
export default class UserRoleController extends AbstractUserController {
  @inject(TYPES.APIRoleService) private roleService: RoleServiceInterface;

  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userRoles = await this.roleService.fetchAll(req.filter);
      return res.json(responseBuilder(userRoles, req.filter.target));
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
      const rolesToAdd = await this.roleService.fetchByIds(
        ...req.body.addRoles
      );
      return res.json(
        responseBuilder({
          rolesToAdd,
          rolesToTake: req.body.takeRoles,
          userId: req.params.userId,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
