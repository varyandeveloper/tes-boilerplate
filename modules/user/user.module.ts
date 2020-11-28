import { Container } from 'inversify';
import { TYPES } from './config/types';
import { UserService } from './services/user.service';
import ModuleInterface from '../core/module.interface';
import UserQueryFilter from './filters/user.query.filter';
import { UserServiceInterface } from './services/user.service.interface';

export default class UserModule implements ModuleInterface {
  init(container: Container): void {
    container.bind<UserServiceInterface>(TYPES.UserService).to(UserService);
    container.bind<UserQueryFilter>(TYPES.UserQueryFilter).to(UserQueryFilter);
  }
}
