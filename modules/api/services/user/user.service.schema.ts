import UserRequest from '../../http/request/user.request';
import UserEntity from '../../../user/entities/user.entity';
import { UserServiceInterface as CoreUserServiceInterface } from '../../../user/services/user.service.interface';

export interface UserServiceInterface extends CoreUserServiceInterface {
  buildEntity(requestEntity: UserRequest): Promise<UserEntity>;
}
