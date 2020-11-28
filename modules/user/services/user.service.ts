import { injectable } from 'inversify';
import UserEntity from '../entities/user.entity';
import UserQueryFilter from '../filters/user.query.filter';
import { UserServiceInterface } from './user.service.interface';
import AbstractRepositoryService from '../../core/services/abstract.repository.service';

@injectable()
export class UserService
  extends AbstractRepositoryService<UserEntity, UserQueryFilter>
  implements UserServiceInterface {
  protected entity = UserEntity;
}
