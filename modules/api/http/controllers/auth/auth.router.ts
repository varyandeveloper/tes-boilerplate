import express from 'express';
import AuthController from './auth.controller';
import { TYPES } from '../../../../../app/config/types';
import container from '../../../../../app/config/inversify.config';
import UserResponseEntity from '../../response/user.response.entity';
import UserQueryFilter from '../../../../user/filters/user.query.filter';
import AuthManager from '../../../../integration/modules/auth/auth.manager';

const authManager = container.get<AuthManager>(TYPES.AuthManager);
const filter = container.get<UserQueryFilter>(TYPES.UserQueryFilter);
const controller = container.get<AuthController>(TYPES.AuthController);

export default express
  .Router()
  .post('/', controller.singIn)
  .use(authManager.getMiddleware())
  .get('/', filter.apply(UserResponseEntity), controller.me);
