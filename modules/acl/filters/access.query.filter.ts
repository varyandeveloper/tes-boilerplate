import autobind from 'autobind-decorator';
import { SelectQueryBuilder } from 'typeorm';
import RoleEntity from '../entities/role.entity';
import PermissionEntity from '../entities/permission.entity';
import CoreQueryFilter from '../../core/filters/core.query.filter';

@autobind
export default class AccessQueryFilter<Entity> extends CoreQueryFilter<Entity> {
  name(
    qb: SelectQueryBuilder<RoleEntity | PermissionEntity>,
    name: string
  ): AccessQueryFilter<Entity> {
    qb.andWhere(`${qb.alias}.name ILIKE :name`, { name: `${name}%` });
    return this;
  }
}
