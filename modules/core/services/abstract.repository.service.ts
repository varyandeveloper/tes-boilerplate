import { injectable } from 'inversify';
import event from '../../../app/common/event';
import { EVENTS } from '../../../app/config/events';
import CoreQueryFilter from '../filters/core.query.filter';
import {
  BaseEntity,
  Repository,
  getManager,
  DeepPartial,
  EntityTarget,
  EntityManager,
  getRepository,
} from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { RepositoryServiceInterface } from './repository.service.schema';

@injectable()
export default abstract class AbstractRepositoryService<
  Entity extends BaseEntity,
  Filter extends CoreQueryFilter<Entity>
> implements RepositoryServiceInterface<Entity, Filter> {
  protected repository: Repository<Entity>;
  protected entity: EntityTarget<Entity>;
  constructor() {
    event.on(EVENTS.DB_CONNECTED, () => {
      this.repository = getRepository(this.entity);
    });
  }

  async inTransaction(
    callback: (entityManager: EntityManager) => Promise<void>,
    isolationLevel: IsolationLevel = 'READ COMMITTED'
  ): Promise<void> {
    await getManager().transaction(isolationLevel, callback);
  }

  async fetch(filter: Filter): Promise<Entity> {
    this.validateFilters(filter);
    return this.repository.findOne(filter && filter.findOptions);
  }

  async fetchAll(filter?: Filter): Promise<Entity[]> {
    return this.repository.find(filter && filter.findOptions);
  }

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async delete(filter: Filter): Promise<void> {
    this.validateFilters(filter);
    await this.repository.delete(filter.findOptions);
  }

  protected validateFilters(filter: Filter): void {
    if (
      !filter ||
      !filter.findOptions ||
      !filter.findOptions.where ||
      !Object.keys(filter.findOptions.where)
    ) {
      throw new Error('Method is not allowed without filter.');
    }
  }
}
