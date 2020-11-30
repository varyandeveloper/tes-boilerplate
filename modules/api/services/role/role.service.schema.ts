import RoleEntity from '../../../acl/entities/role.entity';
import RoleRequestEntity from '../../http/request/role.request';
import { RoleServiceInterface as CoreRoleServiceInterface } from '../../../acl/services/role/role.service.schema';

export interface RoleServiceInterface extends CoreRoleServiceInterface {
  fetchByIds(...id: string[]): Promise<Array<RoleEntity>>;
  buildRoleEntity(requestEntity: RoleRequestEntity): RoleEntity;
}
