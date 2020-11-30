import PermissionEntity from '../../entities/permission.entity';
import PermissionQueryFilter from '../../filters/permission.query.filter';
import { RepositoryServiceInterface } from '../../../core/services/repository.service.schema';

export type PermissionServiceInterface = RepositoryServiceInterface<
  PermissionEntity,
  PermissionQueryFilter
>;
