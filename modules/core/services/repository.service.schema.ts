import { BaseEntity, DeepPartial } from 'typeorm';
import CoreQueryFilter from '../filters/core.query.filter';

export interface RepositoryServiceInterface<
  Entity extends BaseEntity,
  Filter extends CoreQueryFilter<Entity>
> {
  fetch(filter: Filter): Promise<Entity>;

  fetchAll(filter: Filter): Promise<Entity[]>;

  create(entity: DeepPartial<Entity>): Promise<Entity>;

  delete(filter: Filter): Promise<void>;

  update(entity: DeepPartial<Entity>): Promise<Entity>;
}
