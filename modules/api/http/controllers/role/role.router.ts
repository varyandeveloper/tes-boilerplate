import express from 'express';
import RoleController from './role.controller';
import { permitted } from '../../middlewares/acl';
import { TYPES } from '../../../../../app/config/types';
import { validate } from '../../middlewares/validation';
import RoleRequestEntity from '../../request/role.request';
import container from '../../../../../app/config/inversify.config';
import AuthManager from '../../../../integration/modules/auth/auth.manager';
import RoleQueryFilter from '../../../../acl/filters/role.query.filter';

const authManager = container.get<AuthManager>(TYPES.AuthManager);
const roleFilter = container.get<RoleQueryFilter>(TYPES.RoleQueryFilter);
const roleController = container.get<RoleController>(TYPES.RoleController);

export default express
  .Router()
  .use(authManager.getMiddleware())
  .use(
    permitted({
      hasPermission: ['*'],
      hasRole: ['super-admin'],
    })
  )
  .post('/', validate(RoleRequestEntity), roleController.create)
  .get('/', roleFilter.apply(), roleController.fetchAll)
  .get('/:id', roleFilter.apply(), roleController.fetch);
