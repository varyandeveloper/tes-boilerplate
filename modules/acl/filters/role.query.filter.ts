import { SelectQueryBuilder } from 'typeorm';
import RoleEntity from '../entities/role.entity';
import AccessQueryFilter from './access.query.filter';

export default class RoleQueryFilter extends AccessQueryFilter<RoleEntity> {
  userId(qb: SelectQueryBuilder<RoleEntity>, userId: string): RoleQueryFilter {
    qb.leftJoin(
      'user_roles',
      'ur',
      `ur.rolesId = ${qb.alias}.id`
    ).andWhere('ur.usersId = :userId', { userId });
    return this;
  }
}
