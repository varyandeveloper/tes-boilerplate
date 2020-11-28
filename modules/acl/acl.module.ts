import { Container } from 'inversify';
import { TYPES } from './config/types';
import ModuleInterface from '../core/module.interface';
import RoleQueryFilter from './filters/role.query.filter';
import { RoleService } from './services/role/role.service';
import { RoleServiceInterface } from './services/role/role.service.schema';

export default class AclModule implements ModuleInterface {
  init(container: Container): void {
    container.bind<RoleServiceInterface>(TYPES.RoleService).to(RoleService);
    container.bind<RoleQueryFilter>(TYPES.RoleQueryFilter).to(RoleQueryFilter);
  }
}
