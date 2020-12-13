import _ from 'lodash';
import { TYPES } from '../../config/types';
import { inject, injectable } from 'inversify';
import UserRequest from '../../http/request/user/user.request';
import UserEntity from '../../../user/entities/user.entity';
import { UserServiceInterface } from './user.service.schema';
import HashService from '../../../core/services/hash.service';
import { RoleServiceInterface } from '../role/role.service.schema';
import { UserService as CoreUserService } from '../../../user/services/user.service';

@injectable()
export class UserService
  extends CoreUserService
  implements UserServiceInterface {
  @inject(TYPES.APIRoleService) protected roleService: RoleServiceInterface;
  async buildEntity(data: UserRequest): Promise<UserEntity> {
    const userEntity = Object.assign(new UserEntity(), data);
    if (userEntity.password) {
      userEntity.password = await HashService.make(userEntity.password);
    }
    return userEntity;
  }

  async associateRoles(
    user: UserEntity,
    rolesToAdd: Array<string>,
    rolesToTake: Array<string>
  ): Promise<UserEntity> {
    user.roles = user.roles
      .filter(
        (role) => !_.difference(rolesToTake, rolesToAdd).includes(role.id)
      )
      .concat(
        ...(await this.roleService.fetchByIds(
          ..._.difference(
            rolesToAdd,
            rolesToTake,
            user.roles.map((role) => role.id)
          )
        ))
      );
    return user.save();
  }
}
