import UserEntity from '../entities/user.entity';
import UserQueryFilter from '../filters/user.query.filter';
import { RepositoryServiceInterface } from '../../core/services/repository.service.schema';

export type UserServiceInterface = RepositoryServiceInterface<
  UserEntity,
  UserQueryFilter
>;
