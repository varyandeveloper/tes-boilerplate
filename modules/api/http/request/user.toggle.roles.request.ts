import { IsArray } from 'class-validator';

export default class UserToggleRolesRequest {
  @IsArray()
  addRoles: [];

  @IsArray()
  takeRoles: [];
}
