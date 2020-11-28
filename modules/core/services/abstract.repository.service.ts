import { injectable } from 'inversify';
import event from '../../../app/common/event';
import { EVENTS } from '../../../app/config/events';
import CoreQueryFilter from '../filters/core.query.filter';
import { BaseEntity, DeepPartial, getRepository, Repository } from 'typeorm';

@injectable()
export default abstract class AbstractRepositoryService<
  Entity extends BaseEntity,
  Filter extends CoreQueryFilter
> {
  protected repository: Repository<Entity>;
  protected entity: any;
  constructor() {
    event.on(EVENTS.DB_CONNECTED, () => {
      this.repository = getRepository(this.entity);
    });
  }

  async fetch(filter: Filter): Promise<Entity> {
    if (
      !filter ||
      !filter.findOptions ||
      !filter.findOptions.where ||
      !Object.keys(filter.findOptions.where)
    ) {
      throw new Error('Fetch is not allowed without filter.');
    }
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
    await this.repository.delete(filter.findOptions);
  }
}
