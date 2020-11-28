import express from 'express';
import UserController from './user.controller';
import { permitted } from '../../middlewares/acl';
import UserRequest from '../../request/user.request';
import { TYPES } from '../../../../../app/config/types';
import { validate } from '../../middlewares/validation';
import UserRoleController from './user.role.controller';
import container from '../../../../../app/config/inversify.config';
import AuthManager from '../../../../integration/modules/auth/auth.manager';
import UserResponseEntity from '../../response/user.response.entity';
import RoleQueryFilter from '../../../../acl/filters/role.query.filter';
import UserQueryFilter from '../../../../user/filters/user.query.filter';
import UserToggleRolesRequest from '../../request/user.toggle.roles.request';

const authManager = container.get<AuthManager>(TYPES.AuthManager);
const filter = container.get<UserQueryFilter>(TYPES.UserQueryFilter);
const roleFilter = container.get<RoleQueryFilter>(TYPES.RoleQueryFilter);
const userController = container.get<UserController>(TYPES.UserController);
const userRoleController = container.get<UserRoleController>(
  TYPES.UserRoleController
);

export default express
  .Router()
  .use(authManager.getMiddleware())
  .get('/:userId', filter.apply(UserResponseEntity), userController.fetch)
  .patch(
    '/:id',
    permitted({
      hasRole: ['super-admin'],
      hasPermission: ['*'],
    }),
    filter.apply(),
    userController.patch
  )
  .get('/', filter.apply(UserResponseEntity), userController.fetchAll)
  .post('/', validate(UserRequest), userController.create)

  // user roles routes
  .get('/:userId/roles', roleFilter.apply(), userRoleController.fetchAll)
  .patch(
    '/:userId/roles',
    validate(UserToggleRolesRequest),
    userRoleController.patch
  )
  .delete(
    '/:userId/roles/:roleId',
    permitted({
      hasRole: ['super-admin'],
      hasPermission: ['*'],
    }),
    userRoleController.delete
  );
