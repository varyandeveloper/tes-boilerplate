import AccessEntityInterface from './access.schema';

export default interface AclSchema {
  id: string | number;
  permissions: Array<AccessEntityInterface>;
  roles: Array<AccessEntityInterface>;
}
