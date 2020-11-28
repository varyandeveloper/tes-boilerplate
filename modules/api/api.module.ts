import { Container } from 'inversify';
import { TYPES } from '../../app/config/types';
import ModuleInterface from '../core/module.interface';
import RoleService from './services/role/role.service';
import { UserService } from './services/user/user.service';
import TestController from './http/controllers/TestController';
import AuthController from './http/controllers/auth/auth.controller';
import RoleController from './http/controllers/role/role.controller';
import UserController from './http/controllers/user/user.controller';
import { UserServiceInterface } from './services/user/user.service.schema';
import { RoleServiceInterface } from './services/role/role.service.schema';
import UserRoleController from './http/controllers/user/user.role.controller';

export default class ApiModule implements ModuleInterface {
  init(container: Container): void {
    // Controllers
    container.bind<TestController>(TYPES.TestController).to(TestController);
    container
      .bind<UserRoleController>(TYPES.UserRoleController)
      .to(UserRoleController);

    container.bind<AuthController>(TYPES.AuthController).to(AuthController);
    container.bind<UserController>(TYPES.UserController).to(UserController);
    container.bind<RoleController>(TYPES.RoleController).to(RoleController);

    // Services
    container.bind<UserServiceInterface>(TYPES.APIUserService).to(UserService);
    container.bind<RoleServiceInterface>(TYPES.APIRoleService).to(RoleService);
  }
}
