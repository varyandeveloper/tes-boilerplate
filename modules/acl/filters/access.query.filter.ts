import autobind from 'autobind-decorator';
import RoleEntity from '../entities/role.entity';
import { Like, SelectQueryBuilder } from 'typeorm';
import PermissionEntity from '../entities/permission.entity';
import CoreQueryFilter from '../../core/filters/core.query.filter';

@autobind
export default class AccessQueryFilter<Entity> extends CoreQueryFilter<Entity> {
  name(
    qb: SelectQueryBuilder<RoleEntity | PermissionEntity>,
    name: string
  ): AccessQueryFilter<Entity> {
    qb.where({ name: Like(`${name}%`) });
    return this;
  }
}
