import {
  LoadEvent,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import RoleEntity from '../role.entity';
import { cache } from '../../../../app/common/cache';

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<RoleEntity> {
  listenTo() {
    return RoleEntity;
  }

  afterLoad(
    entity: RoleEntity,
    event?: LoadEvent<RoleEntity>
  ): Promise<any> | void {
    if (!cache.has('roles:' + entity.id)) {
      console.log('cached roles:' + entity.id);
      cache.set('roles:' + entity.id, entity);
    }
  }

  beforeInsert(event: InsertEvent<RoleEntity>): Promise<RoleEntity> | void {
    cache.del('roles');
  }

  afterInsert(event: InsertEvent<RoleEntity>): Promise<RoleEntity> | void {
    if (!cache.has('roles:' + event.entity.id)) {
      cache.set('roles:' + event.entity.id, event.entity);
    }
  }

  beforeUpdate(event: UpdateEvent<RoleEntity>): Promise<RoleEntity> | void {
    cache.del('roles:' + event.entity.id);
  }

  afterUpdate(event: UpdateEvent<RoleEntity>): Promise<RoleEntity> | void {
    if (!cache.has('roles:' + event.entity.id)) {
      cache.set('roles:' + event.entity.id, event.entity);
    }
    cache.del('roles');
  }

  beforeRemove(event: RemoveEvent<RoleEntity>): Promise<RoleEntity> | void {
    cache.del('roles:' + event.entity.id);
  }

  afterRemove(event: RemoveEvent<RoleEntity>): Promise<RoleEntity> | void {
    cache.del('roles');
  }
}
