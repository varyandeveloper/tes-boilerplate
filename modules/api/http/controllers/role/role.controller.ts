import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { TYPES } from '../../../../../app/config/types';
import { Request, Response, NextFunction } from 'express';
import responseBuilder from '../../../utils/responseBuilder';
import { RoleServiceInterface } from '../../../services/role/role.service.schema';
import AbstractResourceController from '../../../../core/abstract.resource.controller';

@autobind
@injectable()
export default class RoleController extends AbstractResourceController {
  @inject(TYPES.APIRoleService) private roleService: RoleServiceInterface;

  async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const roles = await this.roleService.fetchAll(req.filter);
      return res.json(responseBuilder(roles));
    } catch (error) {
      next(error);
    }
  }

  async fetch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const roles = await this.roleService.fetchAll(req.filter);
      return res.json(responseBuilder(roles));
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const roleEntity = await this.roleService.buildRoleEntity(req.body);
      await this.roleService.create(roleEntity);
      return res.json({ message: 'Role created.' }).status(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
}
