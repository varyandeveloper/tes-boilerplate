import { getRepository } from 'typeorm';
import AclSchema from '../entities/acl.schema';
import { AclServiceInterface } from './acl.service.schema';
import AclOptionsSchema from '../schemas/acl.options.schema';

export const STRATEGY_ANY = 1; // permitted by any of mentioned options
export const STRATEGY_ALL = 2; // permitted by all of mentioned options

export default class AclService implements AclServiceInterface {
  protected strategy: number = STRATEGY_ANY;

  async permitted(
    aclEntity: AclSchema,
    options: AclOptionsSchema
  ): Promise<boolean> {
    if (options.strategy) {
      this.strategy = options.strategy;
      delete options.strategy;
    }

    if (options.isOwner && options.isOwner.length === 2) {
      if (
        this.strategy === STRATEGY_ALL &&
        (await this.isOwner(
          aclEntity,
          options.isOwner,
          options.requestResourceId
        )) === false
      ) {
        return false;
      } else if (
        this.strategy === STRATEGY_ANY &&
        (await this.isOwner(
          aclEntity,
          options.isOwner,
          options.requestResourceId
        ))
      ) {
        return true;
      }
    }

    delete options.isOwner;
    delete options.requestResourceId;

    for (const [property, value] of Object.entries(options)) {
      if (value) {
        if (
          this.strategy === STRATEGY_ALL &&
          (await this[property](aclEntity, value)) === false
        ) {
          return false;
        } else if (
          this.strategy === STRATEGY_ANY &&
          (await this[property](aclEntity, value)) === true
        ) {
          return true;
        }
      }
    }

    return false;
  }

  async callback(
    aclEntity: AclSchema,
    callback: (aclEntity?: AclSchema) => Promise<boolean>
  ): Promise<boolean> {
    const result = await callback(aclEntity);
    return result === true;
  }

  hasPermission(aclEntity: AclSchema, grantedPermissions: string[]): boolean {
    return aclEntity.permissions.some((permission) =>
      grantedPermissions.includes(permission.name)
    );
  }

  async isOwner(
    aclEntity: AclSchema,
    field = 'userId',
    value?: string
  ): Promise<boolean> {
    const options = { where: { [field]: aclEntity.id } };
    if (value) {
      options.where.id = parseInt(value);
    }
    const repo = getRepository(typeof aclEntity);
    return (await repo.count(options)) > 0;
  }

  hasRole(aclEntity: AclSchema, grantedRoles: string[]): boolean {
    return aclEntity.roles.some((role) => grantedRoles.includes(role.name));
  }
}
