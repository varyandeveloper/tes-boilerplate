import { injectable } from 'inversify';
import PermissionEntity from '../entities/permission.entity';
import AbstractRepositoryService from '../../core/services/abstract.repository.service';

@injectable()
export default class PermissionService extends AbstractRepositoryService<
  PermissionEntity,
  null
> {
  protected entity = PermissionEntity;
}
