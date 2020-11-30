import { injectable } from 'inversify';
import PermissionEntity from '../../entities/permission.entity';
import { PermissionServiceInterface } from './permission.service.schema';
import PermissionQueryFilter from '../../filters/permission.query.filter';
import AbstractRepositoryService from '../../../core/services/abstract.repository.service';

@injectable()
export default class PermissionService
  extends AbstractRepositoryService<PermissionEntity, PermissionQueryFilter>
  implements PermissionServiceInterface {
  protected entity = PermissionEntity;
}
