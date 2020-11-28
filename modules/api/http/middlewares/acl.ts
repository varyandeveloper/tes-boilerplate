import { TYPES } from '../../../../app/config/types';
import AclService from '../../../acl/services/acl.service';
import { Request, Response, NextFunction } from 'express';
import container from '../../../../app/config/inversify.config';
import AuthManager from '../../../integration/modules/auth/auth.manager';
import UserQueryFilter from '../../../user/filters/user.query.filter';
import AclOptionsInterface from '../../../acl/schemas/acl.options.schema';

const ac = new AclService();
const authManager = container.get<AuthManager>(TYPES.AuthManager);

export const permitted = (options: AclOptionsInterface) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filter =
      req.filter || container.get<UserQueryFilter>(TYPES.UserQueryFilter);
    filter.findOptions.relations = ['permissions', 'roles'];
    const user = await authManager.getUser(filter);
    if (req.params.id) {
      options.requestResourceId = req.params.id;
    }
    if (!(await ac.permitted(user, options))) {
      return next({
        message: 'Yuo are not permitted to perform this action.',
        statusCode: 403,
      });
    }
    next();
  };
};

export const isOwner = (field = 'useId') => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await authManager.getUser();
    if (!(await ac.isOwner(user, field, req.params.id))) {
      return next({
        message: 'Yuo are not the owner of this resource.',
        statusCode: 403,
      });
    }
    next();
  };
};

export const canOrGranted = (
  grantedPermissions: string[],
  grantedRoles: string[]
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filter =
      req.filter || container.get<UserQueryFilter>(TYPES.UserQueryFilter);
    filter.findOptions.relations = ['permissions', 'roles'];
    const user = await authManager.getUser(filter);
    if (
      ac.hasPermission(user, grantedPermissions) ||
      ac.hasRole(user, grantedRoles)
    ) {
      return next();
    }
    return next({
      message: 'Yuo dont have access to perform this action.',
      statusCode: 403,
    });
  };
};

export const can = (...grantedPermissions: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filter =
      req.filter || container.get<UserQueryFilter>(TYPES.UserQueryFilter);
    filter.findOptions.relations = ['permissions'];
    const user = await authManager.getUser(filter);
    if (!ac.hasPermission(user, grantedPermissions)) {
      return next({
        message: 'Yuo dont have correct permission to perform this action.',
        statusCode: 403,
      });
    }
    next();
  };
};

export const granted = (...grantedRoles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filter =
      req.filter || container.get<UserQueryFilter>(TYPES.UserQueryFilter);
    filter.findOptions.relations = ['roles'];
    const user = await authManager.getUser();
    if (!ac.hasRole(user, grantedRoles)) {
      return next({
        message: 'Yuo dont have correct role to perform this action.',
        statusCode: 403,
      });
    }
    next();
  };
};
