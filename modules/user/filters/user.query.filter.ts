import { injectable } from 'inversify';
import autobind from 'autobind-decorator';
import { SelectQueryBuilder } from 'typeorm';
import UserEntity from '../entities/user.entity';
import CoreQueryFilter from '../../core/filters/core.query.filter';

@autobind
@injectable()
export default class UserQueryFilter extends CoreQueryFilter<UserEntity> {
  userId(qb: SelectQueryBuilder<UserEntity>, value: string): UserQueryFilter {
    super.id(qb, value);
    return this;
  }

  role(
    qb: SelectQueryBuilder<UserEntity>,
    ...roleIds: string[]
  ): UserQueryFilter {
    qb.leftJoin(
      'user_roles',
      'ur',
      'ur.usersId = UserEntity.id'
    ).andWhere('ur.rolesId = ANY(:roleIds::uuid[])', { roleIds });
    return this;
  }

  permission(
    qb: SelectQueryBuilder<UserEntity>,
    permissionId: string
  ): UserQueryFilter {
    qb.leftJoin(
      'user_permissions',
      'up',
      'up.usersId = UserEntity.id AND up.permissionsId = :permissionId',
      {
        permissionId,
      }
    );
    return this;
  }

  memberOf(
    qb: SelectQueryBuilder<UserEntity>,
    organizationId: string
  ): UserQueryFilter {
    if (qb) {
      qb.andWhere('organizationId = :organizationId', { organizationId });
    } else {
      this.findOptions.where['organizationId'] = organizationId;
    }
    return this;
  }

  managedBy(
    qb: SelectQueryBuilder<UserEntity>,
    managerId: string
  ): UserQueryFilter {
    if (qb) {
      qb.andWhere('managerId = :managerId', { managerId });
    } else {
      this.findOptions.where['managerId'] = managerId;
    }
    return this;
  }

  username(
    qb: SelectQueryBuilder<UserEntity>,
    username: string
  ): UserQueryFilter {
    if (qb) {
      qb.andWhere('username = :username', { username });
    } else {
      this.findOptions.where['username'] = username;
    }
    return this;
  }

  email(qb: SelectQueryBuilder<UserEntity>, email: string): UserQueryFilter {
    if (qb) {
      qb.andWhere('email = :email', { email });
    } else {
      this.findOptions.where['email'] = email;
    }
    return this;
  }

  firstName(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.andWhere(`${qb.alias}.firstName ILIKE :firstName`, {
      firstName: `${value}%`,
    });
    return this;
  }

  lastName(qb: SelectQueryBuilder<UserEntity>, value: string): UserQueryFilter {
    qb.andWhere(`${qb.alias}.lastName ILIKE :lastName`, {
      lastName: `${value}%`,
    });
    return this;
  }

  registeredBefore(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.andWhere(`${qb.alias}.createdAt < :createdAt`, {
      createdAt: value,
    });
    return this;
  }

  registeredAfter(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.andWhere(`${qb.alias}.createdAt > :createdAt`, {
      createdAt: value,
    });
    return this;
  }
}
