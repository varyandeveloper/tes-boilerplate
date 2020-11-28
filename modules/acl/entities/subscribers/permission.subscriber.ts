import {
  LoadEvent,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import PermissionEntity from '../permission.entity';
import { cache } from '../../../../app/common/cache';

@EventSubscriber()
export class PermissionSubscriber
  implements EntitySubscriberInterface<PermissionEntity> {
  listenTo() {
    return PermissionEntity;
  }

  afterLoad(
    entity: PermissionEntity,
    event?: LoadEvent<PermissionEntity>
  ): Promise<any> | void {
    console.log(`after ROLE LOAD: `, event.entity);
  }

  beforeInsert(
    event: InsertEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    cache.del('permissions');
  }

  afterInsert(
    event: InsertEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    cache.del('permissions');
  }

  beforeUpdate(
    event: UpdateEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    cache.del('permissions:' + event.entity.id);
  }

  afterUpdate(
    event: UpdateEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    console.log(`AFTER PERMISSION UPDATED: `, event.entity);
  }

  beforeRemove(
    event: RemoveEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    cache.del('permissions:' + event.entity.id);
  }

  afterRemove(
    event: RemoveEvent<PermissionEntity>
  ): Promise<PermissionEntity> | void {
    console.log(`AFTER PERMISSION DELETED: `, event.entity);
  }
}
