import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../../app/config/types';
import { UserServiceInterface } from '../../../services/user/user.service.schema';
import AbstractResourceController from '../../../../core/abstract.resource.controller';

@autobind
@injectable()
export default abstract class AbstractUserController extends AbstractResourceController {
  @inject(TYPES.APIUserService) protected userService: UserServiceInterface;
}
