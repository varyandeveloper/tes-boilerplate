import { SelectQueryBuilder } from 'typeorm';
import RoleEntity from '../entities/role.entity';
import AccessQueryFilter from './access.query.filter';

export default class RoleQueryFilter extends AccessQueryFilter {
  userId(qb: SelectQueryBuilder<RoleEntity>, userId: string): RoleQueryFilter {
    qb.innerJoin('user_roles', 'ur', 'ur.usersId = :userId', {
      userId,
    });
    return this;
  }
}
