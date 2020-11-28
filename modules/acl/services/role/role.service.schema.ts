import { DeepPartial } from 'typeorm';
import RoleEntity from '../../entities/role.entity';
import RoleQueryFilter from '../../filters/role.query.filter';

export interface RoleServiceInterface {
  fetch(filter: RoleQueryFilter): Promise<RoleEntity>;

  fetchAll(filter: RoleQueryFilter): Promise<RoleEntity[]>;

  create(entity: DeepPartial<RoleEntity>): Promise<RoleEntity>;

  delete(filter: RoleQueryFilter): Promise<void>;

  update(entity: DeepPartial<RoleEntity>): Promise<RoleEntity>;
}
