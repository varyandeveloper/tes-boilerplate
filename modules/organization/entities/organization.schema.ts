import UserSchema from '../../user/entities/user.schema';

export default interface OrganizationSchema {
  id: number | string;
  name: string;
  users: Array<UserSchema>;
}
