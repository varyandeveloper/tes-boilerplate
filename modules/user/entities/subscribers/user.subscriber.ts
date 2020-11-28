import {
  LoadEvent,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import UserEntity from '../user.entity';

/**
 * Remember to not push any logic in any method
 * Each method should call proper service or listener to do there actions
 * For example afterInsert method can call some NotificationService.notify(event.entity) action
 */
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  afterLoad(
    entity: UserEntity,
    event?: LoadEvent<UserEntity>
  ): Promise<UserEntity> | void {
    //console.log(`AFTER USER LOAD: `, event.entity);
  }

  beforeInsert(event: InsertEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`BEFORE USER INSERTED: `, event.entity);
  }

  afterInsert(event: InsertEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`USER INSERTED: `, event.entity);
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`BEFORE USER UPDATE: `, event.entity);
  }

  afterUpdate(event: UpdateEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`AFTER USER UPDATED: `, event.entity);
  }

  beforeRemove(event: RemoveEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`BEFORE USER REMOVE: `, event.entity);
  }

  afterRemove(event: RemoveEvent<UserEntity>): Promise<UserEntity> | void {
    //console.log(`AFTER USER DELETED: `, event.entity);
  }
}
