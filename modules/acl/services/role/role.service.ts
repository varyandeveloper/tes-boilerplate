import { injectable } from 'inversify';
import RoleEntity from '../../entities/role.entity';
import { RoleServiceInterface } from './role.service.schema';
import RoleQueryFilter from '../../filters/role.query.filter';
import AbstractRepositoryService from '../../../core/services/abstract.repository.service';

@injectable()
export class RoleService
  extends AbstractRepositoryService<RoleEntity, RoleQueryFilter>
  implements RoleServiceInterface {
  protected entity = RoleEntity;
}
