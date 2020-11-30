import RoleEntity from '../../entities/role.entity';
import RoleQueryFilter from '../../filters/role.query.filter';
import { RepositoryServiceInterface } from '../../../core/services/repository.service.schema';

export type RoleServiceInterface = RepositoryServiceInterface<
  RoleEntity,
  RoleQueryFilter
>;
