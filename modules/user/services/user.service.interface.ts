import UserEntity from '../entities/user.entity';
import UserQueryFilter from '../filters/user.query.filter';

export interface UserServiceInterface {
  fetch(filter: UserQueryFilter): Promise<UserEntity>;

  fetchAll(filter?: UserQueryFilter): Promise<UserEntity[]>;

  create(userEntity: UserEntity): Promise<UserEntity>;

  update(userEntity: UserEntity): Promise<UserEntity>;
}
