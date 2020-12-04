import { injectable } from 'inversify';
import autobind from 'autobind-decorator';
import UserEntity from '../entities/user.entity';
import CoreQueryFilter from '../../core/filters/core.query.filter';
import { LessThan, ILike, MoreThan, SelectQueryBuilder } from 'typeorm';

@autobind
@injectable()
export default class UserQueryFilter extends CoreQueryFilter<UserEntity> {
  userId(qb: SelectQueryBuilder<UserEntity>, value: string): UserQueryFilter {
    super.id(qb, value);
    return this;
  }

  username(
    qb: SelectQueryBuilder<UserEntity>,
    username: string
  ): UserQueryFilter {
    if (qb) {
      qb.where({ username });
    } else {
      this.findOptions.where['username'] = username;
    }
    return this;
  }

  email(qb: SelectQueryBuilder<UserEntity>, email: string): UserQueryFilter {
    if (qb) {
      qb.where({ email });
    } else {
      this.findOptions.where['email'] = email;
    }
    return this;
  }

  firstName(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.where({ firstName: ILike(`${value}%`) });
    return this;
  }

  lastName(qb: SelectQueryBuilder<UserEntity>, value: string): UserQueryFilter {
    qb.where({ lastName: ILike(`${value}%`) });
    return this;
  }

  registeredBefore(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.where({ createdAt: LessThan(new Date(value)) });
    return this;
  }

  registeredAfter(
    qb: SelectQueryBuilder<UserEntity>,
    value: string
  ): UserQueryFilter {
    qb.where({ createdAt: MoreThan(new Date(value)) });
    return this;
  }
}
