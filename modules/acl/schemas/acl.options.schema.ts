import AclSchema from '../entities/acl.schema';

export default interface AclOptionsSchema {
  isOwner?: string;
  strategy?: number;
  hasRole?: Array<string>;
  requestResourceId?: string;
  hasPermission?: Array<string>;
  callback?: (aclEntityInterface?: AclSchema) => Promise<boolean>;
}
