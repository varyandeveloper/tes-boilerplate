import AclSchema from '../../acl/entities/acl.schema';

export default interface UserSchema extends AclSchema {
  email: string;
  password: string;
  username: string;
  lastName: string;
  firstName: string;
}
