import { IsAlphanumeric, IsDateString, IsEmail, IsUUID } from 'class-validator';

export default class UserFetchRequest {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  lastName: string;

  @IsAlphanumeric()
  username: string;

  @IsAlphanumeric()
  firstName: string;

  @IsDateString()
  registeredAfter: string;

  @IsDateString()
  registeredBefore: string;

  @IsUUID(4, {
    each: true,
    message: 'Permission(s) must be a valid UUID of v4',
  })
  permission: string;

  @IsUUID(4, {
    each: true,
    message: 'ManagingBy (user id) must be a valid UUID of v4',
  })
  managingBy: string;

  @IsUUID(4, {
    each: true,
    message: 'MemberOf (organization id) must be a valid UUID of v4',
  })
  memberOf: string;

  @IsUUID(4, { each: true, message: 'Id(s) must be a valid UUID of v4' })
  id: string;

  @IsUUID(4, { each: true, message: 'Role(s) must be a valid UUID of v4' })
  role: string;
}
