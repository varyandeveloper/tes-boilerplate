import { DeepPartial } from 'typeorm';
import RoleEntity from '../entities/role.entity';
import AccessSchema from '../entities/access.schema';
import AccessQueryFiler from '../filters/access.query.filter';

export default interface AccessServiceInterface {
  fetch(filter: AccessQueryFiler): Promise<AccessSchema>;

  fetchAll(filter: AccessQueryFiler): Promise<AccessSchema[]>;

  create(entity: DeepPartial<RoleEntity>): Promise<void>;

  delete(entity: AccessSchema): Promise<void>;

  update(entity: DeepPartial<AccessSchema>): Promise<void>;
}
