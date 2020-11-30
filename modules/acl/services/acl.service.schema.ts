import AclSchema from '../entities/acl.schema';
import AclOptionsSchema from '../schemas/acl.options.schema';

export interface AclServiceInterface {
  hasRole(aclEntity: AclSchema, grantedRoles: string[]);

  callback(
    aclEntity: AclSchema,
    callback: (aclEntity?: AclSchema) => Promise<boolean>
  );

  permitted(aclEntity: AclSchema, options: AclOptionsSchema);

  isOwner(aclEntity: AclSchema, field: string, value?: string);

  hasPermission(aclEntity: AclSchema, grantedPermissions: string[]);
}
