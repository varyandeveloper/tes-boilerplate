import { injectable } from 'inversify';
import RoleEntity from '../../../acl/entities/role.entity';
import { RoleServiceInterface } from './role.service.schema';
import RoleRequestEntity from '../../http/request/role.request';
import RoleQueryFilter from '../../../acl/filters/role.query.filter';
import { RoleService as CoreRoleService } from '../../../acl/services/role/role.service';

@injectable()
export default class RoleService
  extends CoreRoleService
  implements RoleServiceInterface {
  buildRoleEntity(requestEntity: RoleRequestEntity): RoleEntity {
    return Object.assign(new RoleEntity(), requestEntity);
  }

  async fetchByIds(...id: string[]): Promise<RoleEntity[]> {
    const filter = new RoleQueryFilter();
    filter.id(null, ...id);
    return this.fetchAll(filter);
  }
}
