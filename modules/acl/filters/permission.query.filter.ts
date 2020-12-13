import { SelectQueryBuilder } from 'typeorm';
import AccessQueryFilter from './access.query.filter';
import PermissionEntity from '../entities/permission.entity';

export default class PermissionQueryFilter extends AccessQueryFilter<PermissionEntity> {
  userId(
    qb: SelectQueryBuilder<PermissionEntity>,
    userId: string
  ): PermissionQueryFilter {
    qb.leftJoin(
      'user_permissions',
      'up',
      `up.permissionsId = ${qb.alias}.id`
    ).andWhere('up.usersId = :userId', { userId });
    return this;
  }
}
