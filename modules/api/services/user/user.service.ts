import { injectable } from 'inversify';
import UserRequest from '../../http/request/user.request';
import UserEntity from '../../../user/entities/user.entity';
import { UserServiceInterface } from './user.service.schema';
import HashService from '../../../core/services/hash.service';
import { UserService as CoreUserService } from '../../../user/services/user.service';

@injectable()
export class UserService
  extends CoreUserService
  implements UserServiceInterface {
  async buildEntity(data: UserRequest): Promise<UserEntity> {
    const userEntity = Object.assign(new UserEntity(), data);
    if (userEntity.password) {
      userEntity.password = await HashService.make(userEntity.password);
    }
    return userEntity;
  }
}
